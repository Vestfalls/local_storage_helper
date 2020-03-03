const ELEM_WRAPPER_HEADER_ID = 'header';
const ELEM_WRAPPER_LIST_ID = 'list-wrapper';
const ELEM_INPUT_SEARCH_ID = 'input-search';
const ELEM_LIST_ITEM_ID_PREFIX = 'list-item';

const CLASS_ELEM_HEADER = 'e13-header-wrapper';
const CLASS_ELEM_INPUT = 'e13-input-search';
const CLASS_ELEM_LIST = 'e13-dd-helper-wrapper';
const CLASS_ELEM_LIST_ITEM = 'e13-dd-element';
const CLASS_ELEM_BLUR = 'e13-dd-element-blur';
const CLASS_ELEM_FOCUS = 'e13-dd-element-focus';


const LOAD_STATUS_IN_PROGRES = 'load_in_progress';
const LOAD_STATUS_LOAD_COMPLETE = 'load_complete';

const LOAD_TYPE_GET_FROM_LOCAL = 'get_ls';
const LOAD_TYPE_SET_TO_LOCAL = 'set_ls';
const LOAD_TYPE_REMOVE_WORK_WINDOW = 'remove_ls';

const PREFIX = 'e13-';

const LOGER_ON = true;

let objectToDeploy = [];
let currentLoadStatus = null;


document.addEventListener('keydown', e =>{
    logger('test');
    getInitFunc(e);
})

//TODO:
//add init to list and list elements
//add init to SET ls

function getInitFunc(e){
    if(e.altKey && e.key === 'q' || e.key === 'й'){
        switch (currentLoadStatus){
            case LOAD_STATUS_IN_PROGRES:
                logger('load in progress...')
                break;
            case LOAD_STATUS_LOAD_COMPLETE:
                workWindowHelper(LOAD_TYPE_REMOVE_WORK_WINDOW);
                break;
            default:
                workWindowHelper(LOAD_TYPE_GET_FROM_LOCAL);
        }
    }
}

function workWindowHelper(action){
    setStatus(LOAD_STATUS_IN_PROGRES);
    switch(action){
        case LOAD_TYPE_GET_FROM_LOCAL:
            workWindowInit();
            break;
        case LOAD_TYPE_REMOVE_WORK_WINDOW:
            workWindowRemove();
            break;
    }
}

function workWindowInit(){
    initWrapper();
    initInput();
    objectToDeploy.forEach( e =>{
        e.deploy();
    })
}

function workWindowRemove(){

}

function initWrapper(){
    new DeployElement.Builder('div')
            .setId(ELEM_WRAPPER_HEADER_ID)
            .setAppendToId(null)
            .appendClass(CLASS_ELEM_HEADER)
            .addToDeploy();
}

function initInput(){
    new DeployElement.Builder('input')
            .setId(ELEM_INPUT_SEARCH_ID)
            .setAppendToId(ELEM_WRAPPER_HEADER_ID)
            .appendClass(CLASS_ELEM_INPUT)
            .addToDeploy();
}


function setStatus(status){
    currentLoadStatus = status;
}


class DeployElement {

    constructor(builder) {
       this.element = document.createElement(builder.type);
       this.element.id = builder.id;
       builder.cssClass.forEach(element => {
           this.element.classList.add(element)
       });
       this.element.style = builder.cssStyle;
       this.deployToId = builder.deployToId;
       objectToDeploy.push(this);
    }
    
    deploy(){
        if(this.deployToId === null || typeof(this.deployToId) === 'undefined'){
            document.body.appendChild(this.element)
        } else{
            document.getElementById(this.deployToId).appendChild(this.element);
        }
    }

    static get Builder() {
       class Builder {
          constructor(type) {
             this.type = type;
          }
          setId(id){
              this.id = getId(id);
              return this;
          }
          setAppendToId(id){
              if(id === null){
                this.deployToId = null
              } else{
                this.deployToId = getId(id);
              }
              return this;
          }
          appendClass(cssClass) {
             if(typeof(this.cssClass) === 'undefined'){
                 this.cssClass = [];
             }
             this.cssClass.push(cssClass);
             return this;
          }
          appendStyle(cssStyle) {
             this.cssStyle = cssStyle;
             return this;
          }
          addToDeploy() {
             return new DeployElement(this);
          }
       }
       return Builder;
    }
 }

 function getId(str){
    return PREFIX + str;
}

function logger(...args){
    if(LOGER_ON){
        console.log('e13 ----[',args)
    }
}
