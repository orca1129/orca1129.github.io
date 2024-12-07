console.log("js読込 init.js")

//----------
//初期化処理
//----------
Init()

async function Init(){

    //★categoryNameArr使ってループ処理できるようにしよう
    //★テーブル書き出し、プルダウン設定もMap使うようにすればループがわかりやすくなるのでは
    //★csvにタイプのない場合はプルダウン設定でもタイプのグループ作らないようにしよう

    //データ読み込み
    const data_var= await loadCSVData("./csv/partsParam_var.csv")    
    const data_head= await loadCSVData("./csv/partsParam_head.csv")
    const data_core= await loadCSVData("./csv/partsParam_core.csv")
    const data_arms= await loadCSVData("./csv/partsParam_arms.csv")
    const data_legs= await loadCSVData("./csv/partsParam_legs.csv")
    const data_booster= await loadCSVData("./csv/partsParam_booster.csv")
    const data_fcs= await loadCSVData("./csv/partsParam_fcs.csv")
    const data_generator= await loadCSVData("./csv/partsParam_generator.csv")
    const data_r_arm_unit= await loadCSVData("./csv/partsParam_r_arm_unit.csv")
    const data_l_arm_unit= await loadCSVData("./csv/partsParam_l_arm_unit.csv")
    const data_r_back_unit= await loadCSVData("./csv/partsParam_r_back_unit.csv")
    const data_l_back_unit= await loadCSVData("./csv/partsParam_l_back_unit.csv")

    //データ格納
    SetDataMap("var",data_var[0][0])
    SetDataMap("head",await ArryToMap(data_head))
    SetDataMap("core",await ArryToMap(data_core))
    SetDataMap("arms",await ArryToMap(data_arms))
    SetDataMap("legs",await ArryToMap(data_legs))
    SetDataMap("booster",await ArryToMap(data_booster))
    SetDataMap("fcs",await ArryToMap(data_fcs))
    SetDataMap("generator",await ArryToMap(data_generator))
    SetDataMap("r_arm_unit",await ArryToMap(data_r_arm_unit))
    SetDataMap("l_arm_unit",await ArryToMap(data_l_arm_unit))
    SetDataMap("r_back_unit",await ArryToMap(data_r_back_unit))
    SetDataMap("l_back_unit",await ArryToMap(data_l_back_unit))

    //var書き出し
    document.getElementById("out_ver").innerHTML=data_var[0][0]

    //テーブル書き出し
    OutPartsTable("parts_table_head",data_head)
    OutPartsTable("parts_table_core",data_core)
    OutPartsTable("parts_table_arms",data_arms)
    OutPartsTable("parts_table_legs",data_legs)
    OutPartsTable("parts_table_booster",data_booster)
    OutPartsTable("parts_table_fcs",data_fcs)
    OutPartsTable("parts_table_generator",data_generator)
    OutPartsTable("parts_table_r_arm_unit",data_r_arm_unit)
    OutPartsTable("parts_table_l_arm_unit",data_l_arm_unit)
    OutPartsTable("parts_table_r_back_unit",data_r_back_unit)
    OutPartsTable("parts_table_l_back_unit",data_l_back_unit)

    //プルダウン設定
    OutPartsPullDown("parts_select_head",data_head)
    OutPartsPullDown("parts_select_core",data_core)
    OutPartsPullDown("parts_select_arms",data_arms)
    OutPartsPullDown("parts_select_legs",data_legs)
    OutPartsPullDown("parts_select_booster",data_booster)
    OutPartsPullDown("parts_select_fcs",data_fcs)
    OutPartsPullDown("parts_select_generator",data_generator)
    OutPartsPullDown("parts_select_r_arm_unit",data_r_arm_unit)
    OutPartsPullDown("parts_select_l_arm_unit",data_l_arm_unit)
    OutPartsPullDown("parts_select_r_back_unit",data_r_back_unit)
    OutPartsPullDown("parts_select_l_back_unit",data_l_back_unit)

    //選択パーツ初期化
    InitSelectedParts()

    //スペックシート初期化
    // InitCalcSpec()
}

async function loadCSVData(csvPath){

    //csvをファイルの形で取ってくる
    const response = await fetch(csvPath)
    //csvをテキストで取り込む
    const text = await response.text()
    //トリムとスプリットで配列に整形
    const data = text.trim().split('\n').map(line => 
        line.split(',').map(x => x.trim()))

    return data
}

async function ArryToMap(argData){

    //ヘッダー配列
    var arr_hd
    arr_hd=argData[0]
    
    //データ行のループ
    var mapCategory=new Map()
    for(var i=1;i<argData.length;i++){
        var mapParts=new Map()
        //データ列のループ
        for(var j=0;j<arr_hd.length;j++){
            //Mapに格納
            mapParts.set(arr_hd[j],argData[i][j])
        }
        mapCategory.set(mapParts.get("パーツ名"),mapParts)
    }

    return mapCategory
}

async function OutPartsPullDown(outId,argData){
    
    //データ
    var articles=""
    var tmpType=""
    argData.slice(1).forEach(dt => {
        if(tmpType==""){
            tmpType=dt[2]
            articles='<optgroup label="'+ dt[2] +'">'+articles
        }
        else if(dt[2]!=tmpType){
            tmpType=dt[2]
            articles=articles+'</optgroup><optgroup label="'+ dt[2] +'">'
        }
        articles=articles+'<option value="' + dt[0] +'">'+ dt[0] +'</option>'
    })
    articles=articles+'</optgroup>'

    //書き出し
    document.getElementById(outId).innerHTML = articles
}

async function OutPartsTable(outId,argData){

    //ヘッダーとデータ用の変数
    var articles_hd = ''
    var articles_dt = ''

    //ヘッダー
    argData[0].forEach(hd => {
        articles_hd = articles_hd+'<th>'+hd+'</th>'
    })
    articles_hd = '<tr>'+articles_hd+'</tr>'

    //データ
    argData.slice(1).forEach(dt => {
        var tmp = ""
        dt.forEach(dtcell => {
            tmp = tmp+'<td>'+dtcell+'</td>'
        })
        articles_dt = articles_dt+'<tr>'+tmp+'</tr>'
    })

    //書き出し
    document.getElementById(outId).innerHTML
        = "<thead>"+articles_hd+"</thead>"
            +"<tbody>"+articles_dt+"</tbody>"
}
