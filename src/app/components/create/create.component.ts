import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProductoService, UploadService]
})
export class CreateComponent implements OnInit {
  
  public title:string;
  public producto:Producto;
  public saveProducto: any;
  public status!:string;
  public filesToUpload!:Array<File>;
  public url:string;

  constructor(
    private _productoService:ProductoService,
    private _uploadService:UploadService
  ) {
    this.title="Crear producto";
    this.producto=new Producto('','','','','','');
    this.url=Global.url;
   }

  ngOnInit(): void {
  }

  //guardar un producto
  onSubmit(form: { reset: () => void; }){
    this._productoService.saveProducto(this.producto).subscribe(
      (      response: { producto: { _id: string; }; })=>{
        if(response.producto){
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.producto._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.saveProducto=result.producto;
              this.status='success';
              form.reset();
            });
          }else{
            this.saveProducto=response.producto;
            this.status='success';
            form.reset();
          }
        }else{
          this.status='failed';
        }
      },
      (        error: any)=>{
          console.log(<any>error);
        }
    );
  }

  fileChangeEvent(fileInput:any){
    //realizamos un cast forzado, todos los archivos que seleccionas con el input
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }
}
