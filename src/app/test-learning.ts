import * as _ from 'lodash';
import Matrix from 'ml-matrix';
import irisDataset from 'ml-dataset-iris';
import { DecisionTreeClassifier as DTClassifier } from 'ml-cart';
import { JsonTree, TransitionType } from 'auto-dj';
import { ApiService } from './api.service';

interface DTClassifier {
  root: TreeNode,
  predict: (a:number[][])=>any
}

interface TreeNode {
  splitColumn: number,
  splitValue?: number,
  left?: TreeNode,
  right?: TreeNode,
  distribution: number[][]
}

export class Learner {
  constructor(private apiService: ApiService) {}

  async testWithStudySet() {
    let transitions = await this.apiService.getAllTransitions();
    //if (!transitions) transitions = DATA;
    let data = transitions.filter(d => d.features);
    data = data.filter(d => d.rating);
    data = data.filter(d => new Date(d.date) < new Date(2018, 7, 15));
    const trainingSet = new Matrix(data.map(d => d.features.map(f => Math.round(f*10)/10)));
    const predictions = data.map(d => d.rating);
    /*const trainingSet = [[3],[5],[3],[5]];
    const predictions = [2,2,2,2];*/
    console.log(trainingSet, predictions)
    const classifier = this.getTrainedClassifier(trainingSet, predictions);
    const tree = this.toJsonTree(classifier.root);
    console.log(JSON.stringify(tree, null, 2));
  }

  testWithIris(): JsonTree<number> {
    var trainingSet = irisDataset.getNumbers().slice(0,30);
    var predictions = irisDataset.getClasses().map(
        (elem) => irisDataset.getDistinctClasses().indexOf(elem)
    ).slice(0,30);
    const classifier = this.getTrainedClassifier(trainingSet, predictions);
    const tree = this.toJsonTree(classifier.root);
    console.log(JSON.stringify(tree, null, 2));
    console.log(this.classify(classifier, trainingSet, predictions));
    return tree;
  }

  private getTrainedClassifier(trainingSet: number[][], predictions: number[]): DTClassifier {
    const classifier = new DTClassifier({
        minNumSamples: 5
    });
    classifier.train(trainingSet, predictions);
    console.log(classifier)
    return classifier;
  }

  private classify(classifier: DTClassifier, testSet: number[][], predictions: number[]) {
    const result = classifier.predict(testSet);
    console.log(testSet, predictions, result)
    console.log(_.sum(result.map((r,i) => r == predictions[i] ? 1 : 0))/result.length);
  }

  private toJsonTree(node: TreeNode): JsonTree<number> {
    if (node) {
      if (node.left && node.right) {
        return {
          col: node.splitColumn,
          val: node.splitValue,
          left: this.toJsonTree(node.left),
          right: this.toJsonTree(node.right)
        };
      } else if (node.distribution) {
        const d = node.distribution[0];
        return {
          classes: [d.indexOf(_.max(d))]
        }
      }
    }
  }

}

/*
import * as classifi from 'classifi';
//import * as data_util from 'learningjs/data_util';
const data_util = classifi.data_util;

const D = `
outlook, temp, humidity, wind, label
text, real, text, text, feature_type
'Sunny',80,'High', 'Weak', 'No'
'Sunny',82,'High', 'Strong', 'No'
'Overcast',73,'High', 'Weak', 'Yes'
`
//const url = URL.createObjectURL(data);
const D2 = {
  data: [['Sunny',80,'High', 'Weak'],
    ['Sunny',82,'High', 'Strong'],
    ['Overcast',73,'High', 'Weak'],
    ['Sunny',74,'Low', 'Weak'],
    ['Rainy',50,'Low', 'Weak']],
  targets: ['No', 'No', 'Yes', 'Yes', 'Yes'],
  l_featuresIndex: [0,1,2,3],
  feature_name2id: {'outlook': 0, 'temp': 1, 'humidity': 2, 'wind': 3},
  featureNames: ['outlook', 'temp', 'humidity', 'wind'],
  featuresType: ['text', 'real', 'text', 'text']
}

new classifi.learning.tree().train(D2, function(model, err){
  if(err) {
    console.log(err);
  } else {
    console.log(model)
    console.log(model.classify(['Overcast',90,'High', 'Strong']))
    /*model.calcAccuracy(D2.data, D2.targets, function(acc, correct, total){
      console.log( 'training: got '+correct +' correct out of '+total+' examples. accuracy:'+(acc*100.0).toFixed(2)+'%');
    });*
  }
});*/