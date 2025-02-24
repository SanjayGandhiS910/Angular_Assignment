import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpForUserService } from './Services/http/httpforuser.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  selectedFile: File | null = null
  img!: any[];
  title = 'Angular_Assignment';

  constructor(private HttpForUser: HttpForUserService){}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {``
    this.getData()
    setTimeout(() => {
      console.log(this.img)
    }, 1000);
  }

  getData(){
    this.HttpForUser.getImage().subscribe(d=>{
      this.img = d
      console.log(d)
    })
  }

  onUpload(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.HttpForUser.uploadImage(base64Image)
          .subscribe(response => {
            console.log('Image uploaded successfully', response);
          });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
