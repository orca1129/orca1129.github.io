console.log("js読込 script.js");

//プルダウン選択
function SelOnChange(argCate,argSel,argOut){

    //選択中のパーツ
    const selParts=document.getElementById(argSel).value

    // //パーツパラメータ詳細表示更新
    // WritePartsDetails(argOut,GetDataMapParts(argCate,selParts))

    // //選択中のパーツのデータを更新
    // SetSelectedPartsAll()

    //なんか上のやり方では上手く動かない。
    //data_mapを2回参照してはだめなのか？2回目でエラーになる。
    //data_mapを取ってきて、この中で整理して渡す形にしようか？


    //スペック計算
    CalcSpecMain()

    //スペック表示更新
    WriteCalcSpec()
}

//パーツパラメータ表示更新
function WritePartsDetails(outid,argPartsParaMap){
    var tmpHtml=""
    argPartsParaMap.forEach(function(val,ky){
        if(ky!="パーツ名"){
            tmpHtml=tmpHtml+ky+':'+val+'<br>'
        }
    })
    WriteHtml(outid,tmpHtml)
}   

//スペック計算
async function CalcSpecMain(){
    
    //選択中のパーツ一覧を取得
    const selParts=GetSelectedParts()

    //装備不完全チェック
    //引っかかればスペックは"装備不完全"

    //各項目を計算してスペックに追加
    
    //AP
    var tmpAp=0
    tmpAp=selParts.get("head").get("AP")
            +selParts.get("core").get("AP")
            +selParts.get("arms").get("AP")
            +selParts.get("legs").get("AP")
    
    SetCalcSpec("AP",tmpAp)
    
    //耐弾防御
    //耐EN防御
    //耐爆防御
    //姿勢安定性能
    //安定回復補正
    //照準追従性能
    //ブースト速度
    //QB速度
    //QB消費EN
    //QBリロード時間
    //EN容量
    //EN供給効率
    //EN補充遅延
    //総重量
    //腕部積載合計
    //腕部積載上限
    //積載合計
    //積載上限
    //EN負荷合計
    //EN出力
    //耐弾ダメージ軽減率(%)★
    //耐ENダメージ軽減率(%)★
    //耐爆ダメージ軽減率(%)★
    //EN復元遅延★
    //QB可能回数★
    //EN武器補正(%)★
    //ブースト後退速度★

}

//スペック表示更新
function WriteCalcSpec(){
    var tmpSpec= GetCalcSpec()
    var tmpHtml=""
    tmpSpec.forEach(function(val,ky){
        tmpHtml=tmpHtml+ky+':'+val+'<br>'
    })
    WriteHtml('out_calcspec',tmpHtml)
}

//HTML書き出し
function WriteHtml(id,argHtml){
    document.getElementById(id).innerHTML=argHtml
}
