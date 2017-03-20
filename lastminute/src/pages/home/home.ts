import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Database } from '@ionic/cloud-angular';

import { AnswersPage } from '../answers/answers';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    public questions_list = [];
    constructor(public navCtrl: NavController, public db: Database) {
        this.db.connect();
        const questions_collection = this.db.collection('Questions');
        questions_collection.findAll({ subject_id: "1" }).watch()  // Hard coded for subject id 1 here
            .subscribe(allQuestions => {
                for (let question of allQuestions) {
                    this.questions_list.push(question);
                }
            });
    }

    questionSelected(question) {
        this.navCtrl.push(AnswersPage,
            {
                question_id: question.question_id,
                question_name: question.question_name
            });
    }

}
