import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockOrders = [
    { id: '1', item: 'Widget A', quantity: 2, status: 'active' },
    { id: '2', item: 'Widget B', quantity: 1, status: 'active' },
  ];

  const mockNewOrder = { item: 'Widget C', quantity: 3 };
  const mockCreatedOrder = {
    id: '3',
    item: 'Widget C',
    quantity: 3,
    status: 'active',
  };
  const mockAuthToken = 'mock-auth-token-123';

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    authServiceSpy.getAuthToken.and.returnValue(mockAuthToken);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrders', () => {
    it('should retrieve all orders via GET', () => {
      service.getOrders().subscribe((orders) => {
        expect(orders).toEqual(mockOrders);
        expect(orders.length).toBe(2);
      });

      const req = httpMock.expectOne('/api/orders');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);
    });

    it('should include the auth token in the request headers', () => {
      service.getOrders().subscribe();

      const req = httpMock.expectOne('/api/orders');
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${mockAuthToken}`
      );
      req.flush(mockOrders);
    });

    it('should handle a server error response', () => {
      service.getOrders().subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne('/api/orders');
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should return an empty array when no orders exist', () => {
      service.getOrders().subscribe((orders) => {
        expect(orders).toEqual([]);
        expect(orders.length).toBe(0);
      });

      const req = httpMock.expectOne('/api/orders');
      req.flush([]);
    });
  });

  describe('createOrder', () => {
    it('should create an order via POST and return the created order', () => {
      service.createOrder(mockNewOrder).subscribe((order) => {
        expect(order).toEqual(mockCreatedOrder);
        expect(order.id).toBe('3');
      });

      const req = httpMock.expectOne('/api/orders');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockNewOrder);
      req.flush(mockCreatedOrder);
    });

    it('should include the auth token in the request headers', () => {
      service.createOrder(mockNewOrder).subscribe();

      const req = httpMock.expectOne('/api/orders');
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${mockAuthToken}`
      );
      req.flush(mockCreatedOrder);
    });

    it('should set Content-Type to application/json', () => {
      service.createOrder(mockNewOrder).subscribe();

      const req = httpMock.expectOne('/api/orders');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockCreatedOrder);
    });

    it('should handle a validation error response', () => {
      service.createOrder({}).subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(400);
        },
      });

      const req = httpMock.expectOne('/api/orders');
      req.flush('Validation failed', {
        status: 400,
        statusText: 'Bad Request',
      });
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order and return the updated order', () => {
      const orderId = '1';

      service.cancelOrder(orderId).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const req = httpMock.expectOne(`/api/orders/${orderId}/cancel`);
      expect(req.request.method).toMatch(/PATCH|PUT|DELETE/);
      req.flush({ id: orderId, status: 'cancelled' });
    });

    it('should include the auth token in the request headers', () => {
      const orderId = '2';

      service.cancelOrder(orderId).subscribe();

      const req = httpMock.expectOne(`/api/orders/${orderId}/cancel`);
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${mockAuthToken}`
      );
      req.flush({ id: orderId, status: 'cancelled' });
    });

    it('should handle a not-found error for a non-existent order', () => {
      service.cancelOrder('non-existent-id').subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne('/api/orders/non-existent-id/cancel');
      req.flush('Order not found', {
        status: 404,
        statusText: 'Not Found',
      });
    });

    it('should handle cancelling an already cancelled order', () => {
      service.cancelOrder('1').subscribe({
        next: () => fail('expected an error'),
        error: (error) => {
          expect(error.status).toBe(409);
        },
      });

      const req = httpMock.expectOne('/api/orders/1/cancel');
      req.flush('Order already cancelled', {
        status: 409,
        statusText: 'Conflict',
      });
    });
  });

  describe('AuthService integration', () => {
    it('should call AuthService.getAuthToken when making requests', () => {
      service.getOrders().subscribe();
      const req = httpMock.expectOne('/api/orders');
      req.flush(mockOrders);

      expect(authServiceSpy.getAuthToken).toHaveBeenCalled();
    });

    it('should call AuthService.getAuthToken for each request independently', () => {
      service.getOrders().subscribe();
      const req1 = httpMock.expectOne('/api/orders');
      req1.flush(mockOrders);

      service.createOrder(mockNewOrder).subscribe();
      const req2 = httpMock.expectOne('/api/orders');
      req2.flush(mockCreatedOrder);

      expect(authServiceSpy.getAuthToken).toHaveBeenCalledTimes(2);
    });
  });
});
