import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Users } from '../../modal/users';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) {}

  
  getUsers(): Observable<Users[]> {
    return this.http
      .get(environment.APIURL)
      .pipe<Users[]>(map((data: any) => data.users));
  }

  deleteUser(id: number): Observable<Users> {
    return this.http.delete<Users>(`${environment.APIURL}/${id}`);
  }

  deleteUsers(users: Users[]): Observable<Users[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<Users>(`${environment.APIURL}/${user.id}`)
      )
    );
  }

}
