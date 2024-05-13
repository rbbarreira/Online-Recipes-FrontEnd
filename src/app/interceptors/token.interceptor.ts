import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let token = localStorage.getItem('token');
  let jwtToken = req.clone({
    setHeaders: {
      Authorization:'bearer '+token
    }
  })
  return next(jwtToken);
};
