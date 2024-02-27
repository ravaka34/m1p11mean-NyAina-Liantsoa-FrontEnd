import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  apiService : ApiService = inject(ApiService);

  constructor() { }


//{
//     reviewId : xxx,
//     note : 5,
//     description
// }
  updateReview(data : any){
    return this.apiService.put("/review", data);
  }

  // {
//     "description": "La service est top.",
//     "note": "4",
//     "user": "65d114b9694b16acf977652b",
//     "service" : "65d200cf0d829e1159c1f4d7"
// }
// OR
// {
//     "description": "La service est top.",
//     "note": "4",
//     "user": "65d114b9694b16acf977652b",
//     "employee" : "65d200cf0d829e1159c1f4d7"
// }
  createReview(data : any){
    return this.apiService.post("/review", data);
  }
}
