import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


import * as dataModels from './clickingExample.dataModels';

const LOCAL_STORAGE_KEY: string = 'clickingExample';

interface localStorageObjModel {
    userName: string | null;
    clickingData: dataModels.ClickingData;
}

const _localStorageObj: localStorageObjModel = parseLocalStorageObj(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');

function parseLocalStorageObj(localStorageItem: string):localStorageObjModel {
    let parsedLocalStorageObj: any = JSON.parse(localStorageItem);
    return <localStorageObjModel> { 
        userName: parsedLocalStorageObj.userName || '',
        clickingData: typeLocalStorageClickingData(parsedLocalStorageObj.clickingData)
    }
}

function typeLocalStorageClickingData(parsedLocalStorageClickingDataItem: any): dataModels.ClickingData | undefined {
    if (!parsedLocalStorageClickingDataItem) return; 
    
    let typedLocalStorageClickingData: any = <dataModels.ClickingData> {};
    
    Object.keys(parsedLocalStorageClickingDataItem).forEach((clickingDataKey) => {
        typedLocalStorageClickingData[clickingDataKey] = parseInt(parsedLocalStorageClickingDataItem[clickingDataKey] || '0');
    })

    return <dataModels.ClickingData> typedLocalStorageClickingData;
}

/* Private State Properties */

const _userName$: BehaviorSubject<string> = new BehaviorSubject<string>(_localStorageObj.userName || 'World');
const _clickingData$: BehaviorSubject<dataModels.ClickingData> = new BehaviorSubject<dataModels.ClickingData>(_localStorageObj.clickingData || { homeButtonClickCount: 0, homeButtonClickOutsideCount: 0 });

/* Methods */

export function setUserName(userName: string):void {
    _userName$.next(userName);
}

export function homeButtonClicked():void {
    _clickingData$.take(1).subscribe((clickingData: dataModels.ClickingData) => {
        let updateClickingData: dataModels.ClickingData = Object.assign({}, clickingData, { homeButtonClickCount: clickingData.homeButtonClickCount + 1 });
        _clickingData$.next(updateClickingData);
    });
}

export function homeButtonClickedOutside():void {
    _clickingData$.take(1).subscribe((clickingData: dataModels.ClickingData) => {
        let updateClickingData: dataModels.ClickingData = Object.assign({}, clickingData, { homeButtonClickOutsideCount: clickingData.homeButtonClickOutsideCount + 1 });
        _clickingData$.next(updateClickingData);
    });
}

/* Selectors */

export const userName$: Observable<string> = _userName$.map(userName => userName);

export const clickingData$: Observable<dataModels.ClickingData> = _clickingData$.map(clickingData => clickingData);

/* Local Storage Subscription */

combineLatest(_userName$, _clickingData$).subscribe(([userName, clickingData]) => {
    _localStorageObj.userName = userName;
    _localStorageObj.clickingData = Object.assign({}, clickingData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_localStorageObj));
});
