import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '@ionic/cloud-angular';

/*
  Generated class for the Answers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-answers',
    templateUrl: 'answers.html'
})

export class AnswersPage {
    answers_list = [];
    question_name = "";
    question_id = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: Database) {
        this.question_id = this.navParams.get('question_id');
        this.question_name = this.navParams.get('question_name');
        this.db.connect();
        const comments_collection = this.db.collection('Comments');
        comments_collection.findAll({ question_id: navParams.get('question_id') }).watch()
            .subscribe(allAnswers => {
                for (let answer of allAnswers) {
                    this.answers_list.push(answer);
                      console.log("Length: "+this.answers_list.length);
                }
                if(this.answers_list.length == 0 )
                   {
                  var ans: Answer;
                  ans = new Answer();
                  ans.comments_desc = "Nothing yet";
                  this.answers_list.push(ans);
                  console.log(ans);
                }
            });

    }
}

 class Answer{
  public comments_desc: string;

  constructor(){}
}
