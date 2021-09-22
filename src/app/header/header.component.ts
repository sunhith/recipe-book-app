import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  collapsed = true;
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) {
   }

   onSaveData(){
     this.dataStorageService.storeRecipes();
   }

   onFetchData(){
     this.dataStorageService.fetchRecipes().subscribe();
   }

   onLogout(){
    this.authService.logout();
   }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


}
