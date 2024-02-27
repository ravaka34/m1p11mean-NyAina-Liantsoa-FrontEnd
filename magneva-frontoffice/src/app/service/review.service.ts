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

  getAllEntitiesWithReviews(entitiesName : string){
    return this.apiService.get<any[]>("/review/"+entitiesName);
  }

  getEntityWithReviews(entityId : string, entityName : string){
    // let user = this.localStorageService.getItem("user");
    // let userIdQuery = (user) ? "?userId="+user.id : "";
    //TODO render dynamic userIdQuery
    let userIdQuery = "?userId=65dc4454cf95340c0db28ee4";
    return this.apiService.get<any[]>(`/review/${entityName}/${entityId}${userIdQuery}`);
  }

}
