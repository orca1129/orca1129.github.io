console.log("js読込 temporary.js")

//親マップ
//┗(var)=1.99
//┗(カテゴリー名).(パーツ名)(パラメータ名)=100
var partsData_map=new Map()
var selectedParts_map=new Map()
var specSheet_map=new Map()
var categoryNameArr=[
    'head','core','arms','legs','booster','fcs','generator',
    'r_arm_unit','l_arm_unit','r_back_unit','l_back_unit',]
var selectPartsNameArr=[
    'head','core','arms','legs','booster','fcs','generator',
    'r_arm_unit','l_arm_unit','r_back_unit','r_hanger_unit','l_back_unit','l_hanger_unit']

//パーツデータをMapに格納
function SetDataMap(argKey,argValueMap){partsData_map.set(argKey,argValueMap)}

//パーツデータMapを取得
function GetDataMap(){return partsData_map}

//パーツデータMapをカテゴリー指定で取得
function GetDataMapCategory(argCate){return partsData_map.get(argCate)}

//パーツデータMapをカテゴリー>パーツ指定で取得
function GetDataMapParts(argCate,argParts){
    console.log((partsData_map.get(argCate)).get(argParts))
    // var aaa=partsData_map.get(argCate)
    // var ccc=new Map()
    // ccc=aaa.get(argParts)
    
    // return partsData_map.get(argCate).value.get(argParts)
    return (partsData_map.get(argCate)).get(argParts)
}
    
//選択中のパーツのデータを初期化
function InitselectedParts_map(){
    selectPartsNameArr.forEach(nm => {
        selectedParts_map.set(nm,"None")
    })
}

//選択中のパーツのデータを更新
function SetselectedParts_map(argCate,argParts){
    selectedParts_map.set(argCate,GetDataMapParts(argCate,argParts))
}

//選択中のパーツのデータを更新 全カテゴリー
function SetselectedParts_mapAll(){
    selectPartsNameArr.forEach(nm => {
        SetselectedParts_map(nm,document.getElementById('parts_select_'+nm).value)
    })
}

//選択中のパーツのデータを取得　全カテゴリー
function GetselectedParts_map(){return selectedParts_map}

//選択中のパーツのデータを取得　指定
function GetselectedParts_mapByCategory(argCate){return selectedParts_map.get(argCate)}

//スペックを初期化
function InitspecSheet_map(){
    specSheet_map.clear()
}
//スペックを更新
function SetspecSheet_map(argName,argValue){
    specSheet_map.set(argName,argValue)
}

//スペックを取得　全種
function GetspecSheet_map(){return specSheet_map}

//スペックを取得　指定
function GetspecSheet_mapByName(argName){return specSheet_map.get(argName)}
