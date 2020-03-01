const ELEM_WRAPPER_HEADER_ID = 'e13-header-wrapper';
const ELEM_WRAPPER_LIST_ID = 'e13-elem-list';
const ELEM_INPUT_SEARCH_ID = 'e13-input-search';
const ELEM_LIST_ITEM_ID_PREFIX = 'e13-list-item';

const CLASS_ELEM_BLUR = 'e13-dd-element-blur';
const CLASS_ELEM_FOCUS = 'e13-dd-element-focus';

const PREFIX = 'e13-';

const LOGER_ON = true;

let isLoadInProggress = false;
let isLoadComplete = false;


document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('keydown', e =>{
        keyListen(e)
    })
}) 

function keyListen(e){
    if(e.altKey && e.key === 'q' || e.key === 'й'){
        logger('start');
    }
}
    
function startLoad(event){
    console.log(event);
}

function logger(...args){
    if(LOGER_ON){
        console.log(args)
    }
}