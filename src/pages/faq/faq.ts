import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
shownGroup = null;
 faq = [
    { Question: "How do I know that my insurance is confirmed?", Answer: "Your insurance can only be confirmed once your payment has been processed. We will send you a confirmation e-mail that contains your insurance reference" },
    { Question: "Are my credit card details safe?", Answer: "HAMEN platform use a secure connection for your payment." },
    { Question: "What do I need for making an online payment?", Answer: "All you need is a valid credit card" },
    { Question: "How do I use my voucher code?", Answer: "Choose the voucher in the payment selection, then copy the voucher code and paste it in the voucher box" },
  ];
toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
