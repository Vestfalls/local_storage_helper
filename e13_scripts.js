const ELEM_WRAPPER_HEADER_ID = 'e13-header-wrapper';
const ELEM_WRAPPER_LIST_ID = 'e13-elem-list';
const ELEM_INPUT_SEARCH_ID = 'e13-input-search';
const ELEM_LIST_ITEM_ID_PREFIX = 'e13-list-item';

const CLASS_ELEM_BLUR = 'e13-dd-element-blur';
const CLASS_ELEM_FOCUS = 'e13-dd-element-focus';

const LOAD_STATUS_FIRST_INIT = 'load_first_init'
const LOAD_STATUS_READY_TO_LOAD = 'load_ready_to';
const LOAD_STATUS_IN_PROGRES = 'load_in_progress';
const LOAD_STATUS_LOAD_COMPLETE = 'load_complete';

const LOAD_TYPE_FIRST_INIT = 'init_e13'
const LOAD_TYPE_GET_FROM_LOCAL = 'get_ls';
const LOAD_TYPE_SET_TO_LOCAL = 'set_ls';
const LOAD_TYPE_REMOVE_WORK_WINDOW = 'remove_ls';

const PREFIX = 'e13-';

const LOGER_ON = true;

let currentLoadStatus = null;


document.addEventListener('keydown', e =>{
    logger('test');
    getInitFunc(e);
})

function getInitFunc(e){
    if(e.altKey && e.key === 'q' || e.key === 'й'){
        switch (currentLoadStatus){
            case LOAD_TYPE_FIRST_INIT:
                logger('init not complete, try to restart');
                firstInit();
                break;
            case LOAD_STATUS_IN_PROGRES:
                logger('load in progress...')
                break;
            default:
                initWorkWindow();
        }
    }
}

function initWorkWindow(){
 
}

function logger(...args){
    if(LOGER_ON){
        console.log('e13 ----[',args)
    }
}

function setStatus(status){
    currentLoadStatus = status;
}