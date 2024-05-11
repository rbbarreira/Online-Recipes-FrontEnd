import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let toastr = inject(ToastrService);

  if( localStorage.getItem('userName')!=null) {
    return true;

  }
  else {
    toastr.warning('Unauthorizes Access');
    router.navigateByUrl('/login');
    return false;
  }  
};

export const authGuardRole: CanActivateFn = (route, state) => {
  
  let toastr = inject(ToastrService);

  let UseRole = localStorage.getItem('role') as string;

  if( localStorage.getItem('userName')!=null && UseRole === 'Admin') {    
      return true;  
    }
    else {
      toastr.warning('Unauthorizes Access');      
      return false;
    }
};
