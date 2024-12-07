//初期化

//初期化処理
async function Init(){

    //var読込&書出
    var tmpVer=await loadCSVDataToArr("./csv/partsParam_var.csv")
    document.getElementById("out_ver").innerHTML=tmpVer[0][0]

    //パーツデータ読込&格納
    SetPartsDataMap("head",await loadCSVDataToMap("./csv/partsParam_head.csv"))
    SetPartsDataMap("core",await loadCSVDataToMap("./csv/partsParam_core.csv"))
    SetPartsDataMap("arms",await loadCSVDataToMap("./csv/partsParam_arms.csv"))
    SetPartsDataMap("legs",await loadCSVDataToMap("./csv/partsParam_legs.csv"))
    SetPartsDataMap("booster",await loadCSVDataToMap("./csv/partsParam_booster.csv"))
    SetPartsDataMap("fcs",await loadCSVDataToMap("./csv/partsParam_fcs.csv"))
    SetPartsDataMap("generator",await loadCSVDataToMap("./csv/partsParam_generator.csv"))
    SetPartsDataMap("r_arm_unit",await loadCSVDataToMap("./csv/partsParam_arm_unit.csv"))
    SetPartsDataMap("l_arm_unit",await loadCSVDataToMap("./csv/partsParam_arm_unit.csv"))
    SetPartsDataMap("r_back_unit",await loadCSVDataToMap("./csv/partsParam_back_unit.csv"))
    SetPartsDataMap("r_hanger_unit",await loadCSVDataToMap("./csv/partsParam_arm_unit.csv"))
    SetPartsDataMap("l_back_unit",await loadCSVDataToMap("./csv/partsParam_back_unit.csv"))
    SetPartsDataMap("l_hanger_unit",await loadCSVDataToMap("./csv/partsParam_arm_unit.csv"))

    //テーブル書き出し
    SetPartsListArea()

    //プルダウン設定
    SetPartsSelectArea()
    SetPartsSelectParamAll()

    //選択パーツ初期化
    SetSelPartsAll()

    //スペックシート初期化
    InitSpecMap()
}

//------------------------------
//CSV読み込み

//CSV読み込み（配列）
async function loadCSVDataToArr(csvPath){
    //csvをファイルの形で取ってくる
    const response = await fetch(csvPath)
    //csvをテキストで取り込む
    const text = await response.text()
    //トリムとスプリットで配列に整形
    const dataArr = text.trim().split('\n').map(line => 
        line.split(',').map(x => x.trim())
    )
    return dataArr
}

//CSV読み込み（MAP）
async function loadCSVDataToMap(csvPath){

    //CSV読み込み（配列）
    const dataArr =await loadCSVDataToArr(csvPath)

    var dataMap  //カテゴリー全体Map
    var partsMap //パーツデータMap

    //配列をMapに変換
    var i,j
    dataMap=new Map()
    for(i=1;i<dataArr.length;i++){    
        partsMap=new Map()
        for(j=0;j<dataArr[0].length;j++){
            partsMap.set(dataArr[0][j],dataArr[i][j])
        }
        dataMap.set(partsMap.get("パーツ名"),partsMap)
    }
    return dataMap
}

//------------------------------
//パーツ選択エリア

//プルダウンの生成書き出し
function SetPartsSelectArea(){

    var tmpHtml1 //プルダウンまわり全体
    var tmpHtml2 //プルダウンの中身
    var tmpType,tmpTypeBk

    //パーツデータ
    const tmpDataMap=GetPartsDataMap()

    //カテゴリー
    tmpHtml1=""
    tmpDataMap.forEach((valPrtMap,kyCateNm)=>{

        //パーツ
        tmpHtml2="";
        tmpType="";
        tmpTypeBk="";
        (valPrtMap.keys()).forEach(tmpPartsNm=>{
            tmpType=(valPrtMap.get(tmpPartsNm)).get("タイプ")
            //右は近接武器・シールド除外
            if((
                (
                    tmpType=='近接武器'
                    ||tmpType=='パルスシールド'
                    ||tmpType=='パルスバックラー'
                    ||tmpType=='パルススクトゥム'
                    ||tmpType=='コーラルシールド'
                )
                && noMeleeCategory_arr.includes(kyCateNm))==false){
                //タイプ分け無しはスキップ
                if(tmpType!=""){
                    if(tmpTypeBk==""){
                        tmpTypeBk=tmpType
                        tmpHtml2='<optgroup label="'+ tmpType +'">'+tmpHtml2
                    }
                    else if(tmpTypeBk!=tmpType){
                        tmpTypeBk=tmpType
                        tmpHtml2=tmpHtml2+'</optgroup><optgroup label="'+ tmpType +'">'
                    }
                }
                tmpHtml2=tmpHtml2+'<option value="'+tmpPartsNm+'">'+tmpPartsNm+'</option>'
            }
        })
        //まとめて整形
        tmpHtml1=tmpHtml1
            +'<details id="details_'+kyCateNm+'"><summary>'+kyCateNm.toUpperCase()+':'
                +'<select name="'+kyCateNm+'" id="parts_select_'+kyCateNm+'" onchange="SelOnChange(\''+kyCateNm+'\')">'
                    +tmpHtml2
                +'</select></summary>'
                +'<div id="parts_details_'+kyCateNm+'"></div>' //パーツパラメータ詳細は別途設定する
            +'</details>'
    })
    document.getElementById("parts_select_area").innerHTML=tmpHtml1
}

//パーツパラメータ詳細の生成書き出し（カテゴリーすべて）
function SetPartsSelectParamAll(){
    //パーツデータ
    const tmpDataMap=GetPartsDataMap()
    //カテゴリー
    tmpDataMap.forEach((val,ky)=>{SetPartsSelectParambyCategory(ky)})
}

//パーツパラメータ詳細の生成書き出し（カテゴリー指定）
function SetPartsSelectParambyCategory(argCate){

    var tmpHtml="";

    //パーツデータ
    const tmpDataMap=GetPartsDataMap();

    //選択中のパーツ
    var selPartsName=document.getElementById('parts_select_'+argCate).value;

    //パーツパラメータ詳細
    ((tmpDataMap.get(argCate)).get(selPartsName)).forEach((val,ky)=>{
        if(ky!="パーツ名"){ //パーツ名はプルダウンにあるので詳細には出さない
            if(val!=0 && val!="" && val!="-"){  //パラメータが0,空,-の場合は詳細には出さない　※Noneやタンク足のジャンプ性能とか想定
                tmpHtml=tmpHtml+'<div>'+ky+':'+val+'</div>';
            }
        }
    })
    document.getElementById("parts_details_"+argCate).innerHTML=tmpHtml;
}

//------------------------------
//パーツ一覧エリア

function SetPartsListArea(){

    var tmpTables="";
    var tmpThead,tmpTh;
    var tmpTdody,tmpTd;

    //パーツデータ
    const tmpDataMap=GetPartsDataMap();

    //カテゴリー
    tmpDataMap.forEach((tmpPartsMap,tmpCate)=>{

        //データ
        tmpThead="";
        tmpTdody="";
        tmpPartsMap.forEach((tmpParamMap,tmpPartsNm)=>{
            //パラメータ名
            if(tmpThead==""){
                tmpTh="";
                tmpParamMap.forEach((tmpParam,tmpParamNm)=>{
                    tmpTh=tmpTh+'<th>'+tmpParamNm+'</th>';
                })
                tmpThead='<tr>'+tmpTh+'</tr>';
            }
            //パラメータ値
            tmpTd="";
            tmpParamMap.forEach((tmpParam,tmpParamNm)=>{
                tmpTd=tmpTd+'<td>'+tmpParam+'</td>';
            })
            tmpTdody=tmpTdody+'<tr>'+tmpTd+'</tr>';
        })

        tmpThead='<thead>'+tmpThead+'</thead>';
        tmpTdody='<tbody>'+tmpTdody+'</tbody>';

        tmpTables=tmpTables
            +'<details>'
                +'<summary>パーツリスト '+tmpCate.toUpperCase()+'</summary>'
                +'<table id="parts_table_'+tmpCate+'" border="1">'+tmpThead+tmpTdody+'</table>'
            +'</details>'
    })
    document.getElementById('parts_list_area').innerHTML=tmpTables;
}

//******************************
//処理呼び出し

//初期化処理
Init()
