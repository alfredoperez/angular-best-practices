import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { AuthService } from './auth.service';
import type { Order } from '../models/order.model';

// Test object factory for consistent test data
function createMockOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: crypto.randomUUID(),
    item: 'Widget',
    quantity: 1,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderService', () => {
  let service: OrderService;
  let httpTesting: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Mock services with jasmine.createSpyObj
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getAuthToken']);
    authServiceSpy.getAuthToken.and.returnValue('mock-token-123');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    // Retrieve services via TestBed.inject (mirrors inject() pattern)
    service = TestBed.inject(OrderService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no unmatched HTTP requests remain
    httpTesting.verify();
  });

  describe('getOrders', () => {
    it('should fetch all orders via GET', () => {
      const mockOrders: Order[] = [
        createMockOrder({ id: '1', item: 'Widget A' }),
        createMockOrder({ id: '2', item: 'Widget B' }),
      ];

      service.getOrders().subscribe((orders) => {
        expect(orders).toEqual(mockOrders);
        expect(orders.length).toBe(2);
      });

      const req = httpTesting.expectOne('/api/orders');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);
    });

    it('should return an empty array when no orders exist', () => {
      service.getOrders().subscribe((orders) => {
        expect(orders).toEqual([]);
      });

      const req = httpTesting.expectOne('/api/orders');
      req.flush([]);
    });

    it('should propagate server errors', () => {
      service.getOrders().subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpTesting.expectOne('/api/orders');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('createOrder', () => {
    it('should send a POST request with the order payload', () => {
      const newOrder = createMockOrder({ id: undefined as unknown as string });
      const savedOrder = createMockOrder({ id: '42', item: newOrder.item });

      service.createOrder(newOrder).subscribe((order) => {
        expect(order).toEqual(savedOrder);
        expect(order.id).toBe('42');
      });

      const req = httpTesting.expectOne('/api/orders');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newOrder);
      req.flush(savedOrder);
    });

    it('should handle validation errors from the server', () => {
      const invalidOrder = createMockOrder({ quantity: -1 });

      service.createOrder(invalidOrder).subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(400);
        },
      });

      const req = httpTesting.expectOne('/api/orders');
      req.flush('Validation failed', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('cancelOrder', () => {
    it('should send a DELETE request with the order id', () => {
      const orderId = 'order-123';

      service.cancelOrder(orderId).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpTesting.expectOne(`/api/orders/${orderId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true });
    });

    it('should handle 404 when order does not exist', () => {
      service.cancelOrder('non-existent-id').subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpTesting.expectOne('/api/orders/non-existent-id');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 409 when order is already cancelled', () => {
      service.cancelOrder('already-cancelled').subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(409);
        },
      });

      const req = httpTesting.expectOne('/api/orders/already-cancelled');
      req.flush('Order already cancelled', { status: 409, statusText: 'Conflict' });
    });
  });

  describe('AuthService integration', () => {
    it('should call AuthService.getAuthToken for authenticated requests', () => {
      service.getOrders().subscribe();

      const req = httpTesting.expectOne('/api/orders');
      req.flush([]);

      expect(authServiceSpy.getAuthToken).toHaveBeenCalled();
    });
  });
});
