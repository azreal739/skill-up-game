// //Reactive Angular Engineering — Angular 20+
//
// // import {toSignal} from '@angular/core/rxjs-interop';
// import {Component, computed, inject, Input, signal, Signal} from '@angular/core';
// import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
// import {catchError, filter, fromEvent, map, Observable, of, switchMap, tap} from 'rxjs';
//
// interface User {
//   id: number;
//   name: string;
//   active: boolean;
// }
//
// @Component({
//   selector: 'app-user-card',
//   standalone: true,
//   templateUrl: './session2.html',
// })
// export class UsersComponent {
//
//   users$: Observable<User[]>;
//
//   // this.users
//
//   // value1 = 5;
//
// //   [
// //     { id: '1', name: 'Sean' },
// //     { id: '2', name: 'Tebello' }
// //   ]
// //   [
// //     'Sean',
// //     'Tebello'
// //   ]
//
//   // Observable<User[]> -> Observable<string[]>
//
//   myMetod(): void {
//     const userNames$: Observable<string[]> = this.users$.pipe(
//       map(users => users.map(user => user.name))
//     );
//
//     const nonEmptyUsers$= this.users$.pipe(
//       filter(users => users.length > 0)
//     );
//
//     this.users$.pipe(
//       tap(users => console.log('Users:', users))
//     );
//
//     // SwitchMap
//
//     // a
//     // an
//     // ang
//     // angu
//     // angul
//     // angular
//
//     searchTerm$.pipe(
//       switchMap(term => this.userService.searchUsers(term).pipe(
//         catchError(error => of([]))
//       ))
//     )
//
//
//
//
//     // const value = 5;
//     //
//     // const promise = fetch('/api/user');
//     //
//     // const clicks$ = fromEvent(button, 'click');
//   }
//
//   // @Input() user: User = { name: 'Sean', active: true, id: 1 };
//   //
//   // users = [
//   //   { name: 'Sean', active: true } ,
//   //   { name: 'Jane', active: false }
//   // ];
//   //
//   // activeUsersNames = computed(() => {
//   //     this.users.
//   //       filter(user => user.active).
//   //       map(user => user.name).
//   //       join(', ')
//   //   }
//   // );
//
//
//   // name = 'Sean';
//
//   // users$ = this.service.getUser();
//   //
//   // users = toSignal(this.service.getUser(), { initalValue: []});
//   //
//   // ngOnInit() {
//   //   this.service.getUser().subscribe(user => {
//   //     this.user = user;
//   //   });
//   // }
//
//   // save(): void {
//   //   console.log("save");
//   // }
// }
//
//
//   // firstName = signal('Waldt');
//   // lastName = signal('Kotze - Van Vuuren');
//   //
//   // fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
//
//
// //   count = signal(4);
// //
// //   total = computed(() => this.price() * this.quantity());
// //
// //   effect(() => {
// //   this.total.set(this.price() * this.quantity());
// // });
//
//   // double = computed(() => this.count() * 2);
//
//   // value = this.count();
//   //
//   // this.count.set(5);
//   //
//   // this.count.update(value => value + 1);
//
//   // private readonly userService = inject(UserService);
//   //
//   // users: Signal<User[]> = toSignal(this.userService.getUsers(), {
//   //   initialValue: [],
//   // })
//
//   // constructor(private readonly userService: UserService) {
//   //
//   // }
// // }
//
//
// //
// // interface User {
// //   id: number;
// //   name: string;
// //   active: boolean;
// // }
//
// //export class UsersComponent implements OnInit, OnDestroy {
// //   users: User[] = [];
// //   private destroy$ = new Subject<void>();
// //
// //   ngOnInit() {
// //     this.userService.getUsers()
// //       .pipe(takeUntil(this.destroy$))
// //       .subscribe(users => {
// //         this.users = users;
// //       });
// //   }
// //
// //   ngOnDestroy() {
// //     this.destroy$.next();
// //     this.destroy$.complete();
// //   }
// // }
// //
// // export class UsersComponent {
// //   users: User[] = [];
// //
// //   constructor(private readonly userService: UserService ) {
// //     this.userService.getUsers()
// //       .pipe(takeUntilDestroyed())
// //       .subscribe(users => {
// //         this.users = users;
// //       })
// //   }
// // }
