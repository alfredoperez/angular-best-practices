import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  description: string;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  recentOrders: Order[];
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Loading State -->
    @if (loading()) {
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Loading profile...</p>
      </div>
    }

    <!-- Error State -->
    @if (error()) {
      <div class="error-container">
        <h2>Something went wrong</h2>
        <p>{{ error() }}</p>
        <button (click)="loadUserProfile()">Try Again</button>
      </div>
    }

    <!-- Profile Content -->
    @if (user() && !loading()) {
      <div class="profile-page">
        <header class="profile-header">
          <img
            [src]="user()!.avatarUrl"
            [alt]="fullName()"
            class="avatar"
          />
          <div class="header-info">
            <h1>{{ fullName() }}</h1>
            <p class="email">{{ user()!.email }}</p>
          </div>
          <button
            class="edit-toggle-btn"
            (click)="toggleEditMode()"
          >
            {{ isEditing() ? 'Cancel' : 'Edit Profile' }}
          </button>
        </header>

        <!-- User Info Display -->
        @if (!isEditing()) {
          <section class="user-info">
            <h2>Personal Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>First Name</label>
                <span>{{ user()!.firstName }}</span>
              </div>
              <div class="info-item">
                <label>Last Name</label>
                <span>{{ user()!.lastName }}</span>
              </div>
              <div class="info-item">
                <label>Email</label>
                <span>{{ user()!.email }}</span>
              </div>
              <div class="info-item">
                <label>Phone</label>
                <span>{{ user()!.phone }}</span>
              </div>
              <div class="info-item">
                <label>Address</label>
                <span>{{ user()!.address }}</span>
              </div>
              <div class="info-item">
                <label>City</label>
                <span>{{ user()!.city }}</span>
              </div>
              <div class="info-item">
                <label>State</label>
                <span>{{ user()!.state }}</span>
              </div>
              <div class="info-item">
                <label>Zip Code</label>
                <span>{{ user()!.zipCode }}</span>
              </div>
            </div>
          </section>
        }

        <!-- Edit Form -->
        @if (isEditing()) {
          <section class="edit-form-section">
            <h2>Edit Profile</h2>
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="form-grid">
                <div class="form-field">
                  <label for="firstName">First Name</label>
                  <input id="firstName" formControlName="firstName" type="text" />
                  @if (profileForm.get('firstName')?.hasError('required') && profileForm.get('firstName')?.touched) {
                    <span class="field-error">First name is required</span>
                  }
                </div>

                <div class="form-field">
                  <label for="lastName">Last Name</label>
                  <input id="lastName" formControlName="lastName" type="text" />
                  @if (profileForm.get('lastName')?.hasError('required') && profileForm.get('lastName')?.touched) {
                    <span class="field-error">Last name is required</span>
                  }
                </div>

                <div class="form-field">
                  <label for="email">Email</label>
                  <input id="email" formControlName="email" type="email" />
                  @if (profileForm.get('email')?.hasError('required') && profileForm.get('email')?.touched) {
                    <span class="field-error">Email is required</span>
                  }
                  @if (profileForm.get('email')?.hasError('email') && profileForm.get('email')?.touched) {
                    <span class="field-error">Please enter a valid email</span>
                  }
                </div>

                <div class="form-field">
                  <label for="phone">Phone</label>
                  <input id="phone" formControlName="phone" type="tel" />
                </div>

                <div class="form-field">
                  <label for="address">Address</label>
                  <input id="address" formControlName="address" type="text" />
                </div>

                <div class="form-field">
                  <label for="city">City</label>
                  <input id="city" formControlName="city" type="text" />
                </div>

                <div class="form-field">
                  <label for="state">State</label>
                  <input id="state" formControlName="state" type="text" />
                </div>

                <div class="form-field">
                  <label for="zipCode">Zip Code</label>
                  <input id="zipCode" formControlName="zipCode" type="text" />
                </div>
              </div>

              <div class="form-actions">
                <button type="button" (click)="toggleEditMode()">Cancel</button>
                <button
                  type="submit"
                  class="save-btn"
                  [disabled]="profileForm.invalid || saving()"
                >
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </section>
        }

        <!-- Recent Orders -->
        <section class="orders-section">
          <h2>Recent Orders</h2>
          @if (user()!.recentOrders.length === 0) {
            <p class="no-orders">No recent orders found.</p>
          } @else {
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (order of user()!.recentOrders; track order.id) {
                  <tr>
                    <td>{{ order.id }}</td>
                    <td>{{ order.date | date:'mediumDate' }}</td>
                    <td>{{ order.description }}</td>
                    <td>{{ order.total | currency }}</td>
                    <td>
                      <span class="status-badge" [class]="'status-' + order.status.toLowerCase()">
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </section>
      </div>
    }
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-container {
      text-align: center;
      padding: 3rem;
      color: #dc2626;
    }

    .error-container button {
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .profile-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }

    .header-info h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .header-info .email {
      margin: 0.25rem 0 0;
      color: #64748b;
    }

    .edit-toggle-btn {
      margin-left: auto;
      padding: 0.5rem 1.25rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .info-grid, .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .info-item label, .form-field label {
      display: block;
      font-size: 0.85rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }

    .info-item span {
      font-size: 1rem;
    }

    .form-field input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .field-error {
      color: #dc2626;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      display: block;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }

    .form-actions button {
      padding: 0.5rem 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      cursor: pointer;
      background: white;
    }

    .save-btn {
      background: #3b82f6 !important;
      color: white !important;
      border-color: #3b82f6 !important;
    }

    .save-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed !important;
    }

    .orders-section {
      margin-top: 2rem;
    }

    .no-orders {
      color: #64748b;
    }

    .orders-table {
      width: 100%;
      border-collapse: collapse;
    }

    .orders-table th,
    .orders-table td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .orders-table th {
      font-weight: 600;
      color: #475569;
      font-size: 0.85rem;
    }

    .status-badge {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-delivered { background: #dcfce7; color: #166534; }
    .status-shipped { background: #dbeafe; color: #1e40af; }
    .status-pending { background: #fef9c3; color: #854d0e; }
    .status-cancelled { background: #fee2e2; color: #991b1b; }

    .user-info, .edit-form-section {
      margin-bottom: 2rem;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly user = signal<UserProfile | null>(null);
  readonly isEditing = signal(false);

  readonly fullName = computed(() => {
    const u = this.user();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: [''],
    city: [''],
    state: [''],
    zipCode: [''],
  });

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<UserProfile>('/api/user/profile').subscribe({
      next: (profile) => {
        this.user.set(profile);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load user profile. Please try again.');
        this.loading.set(false);
      },
    });
  }

  toggleEditMode(): void {
    if (!this.isEditing()) {
      const u = this.user();
      if (u) {
        this.profileForm.patchValue({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone,
          address: u.address,
          city: u.city,
          state: u.state,
          zipCode: u.zipCode,
        });
      }
    }
    this.isEditing.update((v) => !v);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const updatedData = this.profileForm.value;

    this.http.put<UserProfile>('/api/user/profile', updatedData).subscribe({
      next: (updatedProfile) => {
        this.user.set(updatedProfile);
        this.saving.set(false);
        this.isEditing.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to save profile. Please try again.');
        this.saving.set(false);
      },
    });
  }
}
