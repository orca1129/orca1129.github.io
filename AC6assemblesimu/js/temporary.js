//データ保持

//親マップ
//┗(var)=1.99
//┗(カテゴリー名).(パーツ名)(パラメータ名)=100
var partsData_map=new Map()
var selectedParts_map=new Map()
var specsheet_map=new Map()
var categoryName_arr=[
    'head','core','arms','legs','booster','fcs','generator',
    'r_arm_unit','l_arm_unit','r_back_unit','l_back_unit']
var selectedParts_arr=[
    'head','core','arms','legs','booster','fcs','generator',
    'r_arm_unit','l_arm_unit','r_back_unit','r_hanger_unit','l_back_unit','l_hanger_unit']
var noMeleeCategory_arr=['r_arm_unit','r_back_unit','r_hanger_unit']

//パーツデータ------------------------------

//パーツデータをMapに格納
function SetPartsDataMap(argKey,argValueMap){partsData_map.set(argKey,argValueMap)}

//パーツデータMapを取得
function GetPartsDataMap(){return partsData_map}

//パーツデータMapをカテゴリー指定で取得
function GetPartsDataMapCategory(argCate){return partsData_map.get(argCate)}

//パーツデータMapをカテゴリー>パーツ指定で取得
function GetPartsDataMapParts(argCate,argParts){
    return (partsData_map.get(argCate)).get(argParts)
}

//選択中のパーツ------------------------------

//選択中のパーツのデータを初期化
function InitSelParts(){
    selectedParts_arr.forEach(nm => {
        selectedParts_map.set(nm,"None")
    })
}

//選択中のパーツのデータを更新
function SetSelParts(argCate){
    selectedParts_map.set(argCate,GetPartsDataMapParts(argCate,document.getElementById('parts_select_'+argCate).value))
}

//選択中のパーツのデータを更新 全カテゴリー
function SetSelPartsAll(){
    selectedParts_arr.forEach(nm => {
        SetSelParts(nm)
    })
}

//選択中のパーツの一覧を取得
function GetSelParts(){return selectedParts_map}

//選択中のパーツのデータを取得
function GetSelPartsByCategory(argCate){return selectedParts_map.get(argCate)}

//選択中のパーツのパラメータを取得
function GetSelPartsParam(argCate,argParamNm){
    return (selectedParts_map.get(argCate)).get(argParamNm)
}

//選択中のパーツのパラメータを取得(数値)
function GetSelPartsParamNum(argCate,argParamNm){
    return Number(GetSelPartsParam(argCate,argParamNm))
}

//スペック------------------------------

//スペックを初期化
function InitSpecMap(){specsheet_map.clear()}

//スペックを更新
function SetSpecMap(argName,argValue){specsheet_map.set(argName,argValue)}

//スペックを取得　全種
function GetSpecMap(){return specsheet_map}

//スペックを取得　指定
function GetSpecMapByName(argName){return specsheet_map.get(argName)}
