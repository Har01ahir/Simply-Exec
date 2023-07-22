import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  server_url = environment.SERVER_URL

  constructor(
    private http: HttpClient
  ) { 

  }


  async postRequest(api: string, data: any): Promise<any> {
    return await this.http.post(this.server_url + api, data)
  }

  async getRequest(api: string):Promise<any> {
    return await this.http.get(this.server_url + api)
  }

  async patchRequest(api: string, data: any): Promise<any> {
    return await this.http.patch(this.server_url + api, data)
  }
}
