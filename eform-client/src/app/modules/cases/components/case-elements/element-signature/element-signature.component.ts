import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Gallery, GalleryComponent, GalleryItem, ImageItem} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
import {CaseFieldValue} from 'src/app/common/models/cases';



@Component({
  selector: 'element-signature',
  templateUrl: './element-signature.component.html',
  styleUrls: ['./element-signature.component.scss']
})
export class ElementSignatureComponent implements OnChanges {
  @Input() fieldValues: Array<CaseFieldValue> = [];
  images = [];
  galleryImages: GalleryItem[] = [];
  spinnerStatus = false;

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.fieldValues) {
      this.fieldValues.forEach(value => {
        if (value.uploadedDataObj) {
          this.images.push({
            src: '/api/template-files/get-image/' + value.uploadedDataObj.fileName,
            thumbnail: '/api/template-files/get-image/' + value.uploadedDataObj.fileName,
            fileName: value.uploadedDataObj.fileName,
            text: value.id.toString(),
            uploadedObjId: value.uploadedDataObj.id
          });
        }
      });
      if (this.images.length > 0) {
        this.updateGallery();
      }
    }
  }

  updateGallery() {
    this.galleryImages = [];
    this.images.forEach(value => {
      this.galleryImages.push( new ImageItem({ src: value.src, thumb: value.thumbnail }));
    });
  }

  openPicture(i: any) {
    this.updateGallery();
    this.gallery.ref('lightbox').load(this.galleryImages);
    this.lightbox.open(i);
  }
}
