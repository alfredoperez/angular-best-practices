import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import type { ResourceRef } from '@angular/core';

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly avatarUrl: string;
}

export interface Order {
  readonly id: number;
  readonly date: string;
  readonly total: number;
  readonly status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

interface UserProfileResponse {
  readonly user: User;
  readonly orders: readonly Order[];
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'user-profile',
  },
  template: `
    @if (profileResource.isLoading()) {
      <div class="loading" role="status" aria-live="polite">
        <p>Loading profile...</p>
      </div>
    } @else if (profileResource.error()) {
      <div class="error" role="alert">
        <p>Failed to load profile. Please try again.</p>
        <button (click)="profileResource.reload()">Retry</button>
      </div>
    } @else if (profile()) {
      <section aria-labelledby="profile-heading">
        <h1 id="profile-heading">{{ profile()!.user.name }}</h1>

        @if (!isEditing()) {
          <div class="user-info">
            <dl>
              <dt>Email</dt>
              <dd>{{ profile()!.user.email }}</dd>
              <dt>Phone</dt>
              <dd>{{ profile()!.user.phone }}</dd>
            </dl>
            <button (click)="startEdit()">Edit Profile</button>
          </div>
        } @else {
          <form class="edit-form" (ngSubmit)="saveProfile()" aria-label="Edit profile">
            <label for="edit-name">Name</label>
            <input id="edit-name" [(ngModel)]="editName" name="name" required />

            <label for="edit-email">Email</label>
            <input id="edit-email" [(ngModel)]="editEmail" name="email" type="email" required />

            <label for="edit-phone">Phone</label>
            <input id="edit-phone" [(ngModel)]="editPhone" name="phone" type="tel" />

            <div class="form-actions">
              <button type="submit" [disabled]="isSaving()">
                @if (isSaving()) { Saving... } @else { Save }
              </button>
              <button type="button" (click)="cancelEdit()">Cancel</button>
            </div>
          </form>
        }
      </section>

      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading">Recent Orders ({{ orderCount() }})</h2>

        @if (profile()!.orders.length === 0) {
          <p>No recent orders.</p>
        } @else {
          <table aria-label="Recent orders">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              @for (order of profile()!.orders; track order.id) {
                <tr>
                  <td>{{ order.id }}</td>
                  <td>{{ order.date | date: 'mediumDate' }}</td>
                  <td>{{ order.total | currency }}</td>
                  <td>
                    <span [class.status-pending]="order.status === 'pending'"
                          [class.status-shipped]="order.status === 'shipped'"
                          [class.status-delivered]="order.status === 'delivered'"
                          [class.status-cancelled]="order.status === 'cancelled'">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
      max-width: 48rem;
      margin: 0 auto;
      padding: 1.5rem;
    }

    .loading,
    .error {
      text-align: center;
      padding: 2rem;
    }

    .error button {
      margin-top: 1rem;
    }

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem 1rem;
    }

    dt {
      font-weight: 600;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 24rem;
    }

    .edit-form input {
      padding: 0.5rem;
      border: 1px solid var(--border-color, #ccc);
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      gap: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th,
    td {
      text-align: left;
      padding: 0.5rem;
      border-bottom: 1px solid var(--border-color, #eee);
    }

    .status-pending { color: var(--color-warning, #f59e0b); }
    .status-shipped { color: var(--color-info, #3b82f6); }
    .status-delivered { color: var(--color-success, #10b981); }
    .status-cancelled { color: var(--color-error, #ef4444); }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `,
})
export class UserProfileComponent {
  private readonly http = inject(HttpClient);

  protected readonly isEditing = signal(false);
  protected readonly isSaving = signal(false);
  protected readonly editName = signal('');
  protected readonly editEmail = signal('');
  protected readonly editPhone = signal('');

  readonly profileResource = httpResource<UserProfileResponse>(
    () => `/api/user/profile`
  );

  protected readonly profile = computed(() => this.profileResource.value());

  protected readonly orderCount = computed(
    () => this.profile()?.orders.length ?? 0
  );

  startEdit(): void {
    const user = this.profile()?.user;
    if (!user) return;
    this.editName.set(user.name);
    this.editEmail.set(user.email);
    this.editPhone.set(user.phone);
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  saveProfile(): void {
    this.isSaving.set(true);
    this.http
      .put<User>('/api/user/profile', {
        name: this.editName(),
        email: this.editEmail(),
        phone: this.editPhone(),
      })
      .subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isEditing.set(false);
          this.profileResource.reload();
        },
        error: () => {
          this.isSaving.set(false);
        },
      });
  }
}
