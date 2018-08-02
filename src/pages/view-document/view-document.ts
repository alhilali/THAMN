import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileModel } from '../../providers/database/database.models';

/**
 * Generated class for the ViewDocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-document',
  templateUrl: 'view-document.html',
})
export class ViewDocumentPage {
  file: FileModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.file = this.navParams.get('file');
    console.log(this.file);
    
  }

  ionViewDidLoad() {
  }

}
