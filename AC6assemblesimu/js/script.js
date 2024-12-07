//処理

//プルダウン選択
function SelOnChange(argCate){

    //選択パーツの更新
    SetSelParts(argCate)

    //--------------------
    //排他装備の解除

    //LEGSタンク/BOOSTER
    if(argCate=="legs"){
        if(GetSelPartsParam("legs","タイプ")=="タンク"){
            if(GetSelPartsParam("booster","パーツ名")!="None"){
                SetSelPartsPulldown("booster","None")
            }
        }
    }else if(argCate=="booster"){
        if(GetSelPartsParam("legs","タイプ")=="タンク"){
            if(GetSelPartsParam("legs","パーツ名")!="None"){
                SetSelPartsPulldown("legs","None")
            }
        }
    }

    //HANGER/BACK
    if(argCate=="r_back_unit"){
        if(GetSelPartsParam("r_hanger_unit","パーツ名")!="None"){
            SetSelPartsPulldown("r_hanger_unit","None")
        }
    }else if(argCate=="l_back_unit"){
        if(GetSelPartsParam("l_hanger_unit","パーツ名")!="None"){
            SetSelPartsPulldown("l_hanger_unit","None")
        }
    }else if(argCate=="r_hanger_unit"){
        if(GetSelPartsParam("r_back_unit","パーツ名")!="None"){
            SetSelPartsPulldown("r_back_unit","None")
        }
    }else if(argCate=="l_hanger_unit"){
        if(GetSelPartsParam("l_back_unit","パーツ名")!="None"){
            SetSelPartsPulldown("l_back_unit","None")
        }
    }

    //ARMS/HANGER重複
    if(argCate=="r_arm_unit"){
        if(GetSelPartsParam("r_arm_unit","パーツ名")==GetSelPartsParam("r_hanger_unit","パーツ名")){
            SetSelPartsPulldown("r_hanger_unit","None")
        }
    }else if(argCate=="l_arm_unit"){
        if(GetSelPartsParam("l_arm_unit","パーツ名")==GetSelPartsParam("l_hanger_unit","パーツ名")){
            SetSelPartsPulldown("l_hanger_unit","None")
        }
    }else if(argCate=="r_hanger_unit"){
        if(GetSelPartsParam("r_arm_unit","パーツ名")==GetSelPartsParam("r_hanger_unit","パーツ名")){
            SetSelPartsPulldown("r_arm_unit","None")
        }
    }else if(argCate=="l_hanger_unit"){
        if(GetSelPartsParam("l_arm_unit","パーツ名")==GetSelPartsParam("l_hanger_unit","パーツ名")){
            SetSelPartsPulldown("l_arm_unit","None")
        }
    }

    //--------------------

    //パーツパラメータ詳細表示更新
    SetPartsSelectParambyCategory(argCate)

    //スペック計算・表示
    CalcSpecSheet()
}

//プルダウン選択中のパーツの変更
function SetSelPartsPulldown(argCate,argParamNm){
    //プルダウン選択中のパーツの変更
    document.getElementById('parts_select_'+argCate).value=argParamNm
    //選択中パーツのデータ更新
    SetSelParts(argCate)
}

//スペック計算
function CalcSpecSheet(){
    
    //表示用HTML
    var tmpHtml=""

    //装備不完全チェック
    //引っかかればスペックは"装備不完全"
    if(CheckIncompleteEquipment()==false){
        tmpHtml='装備不完全<br>';
    }else{

        //各項目を計算してスペックに追加
        
        //Error
        var tmpHtmlErr="";

        //先に欲しい項目------------------------------
        
        //コア補正
        //ブースタ効率補正
        var tmpCoreCorrBooster=GetSelPartsParamNum("core","ブースタ効率補正")
        //ジェネレータ出力補正
        var tmpCoreCorrEnSupply=GetSelPartsParamNum("core","ジェネレータ出力補正")
        //ジェネレータ供給補正
        var tmpCoreCorrEnOutput=GetSelPartsParamNum("core","ジェネレータ供給補正")

        //腕部補正
        //近接武器適性
        var tmpArmsMeleeCorr=GetSelPartsParamNum("arms","近接武器適性")
        //射撃武器適性
        var tmpArmsRangedWeponCorr=GetSelPartsParamNum("arms","射撃武器適性")
        
        //ジェネレーター
        //EN出力
        var tmpEnOutPut=(GetSelPartsParamNum("generator","EN出力"))*(tmpCoreCorrEnSupply/100)
        //EN容量
        var tmpEnCapacity=GetSelPartsParamNum("generator","EN容量")
        //EN補充性能
        var tmpSupplyCorr=GetSelPartsParamNum("generator","EN補充性能")
        //供給復元性能
        var tmpSupplyRestoration=GetSelPartsParamNum("generator","供給復元性能")
        //復元時補充EN
        var tmpRestorationEn=GetSelPartsParamNum("generator","復元時補充EN")
        //EN射撃武器適正
        var tmpEnWeponCorr=GetSelPartsParamNum("generator","EN射撃武器適正")

        //フレーム系------------------------------

        //AP
        var tmpAp=AddParam(["head","core","arms","legs"],"AP")
        tmpHtml=tmpHtml+'AP:'+tmpAp+'<br>'
        
        //耐弾防御
        var tmpKe=AddParam(["head","core","arms","legs"],"耐弾防御")
        tmpHtml=tmpHtml+'耐弾防御:'+tmpKe+'(軽減率:'+(tmpKe-1000)/10+'%)<br>'

        //耐EN防御
        var tmpTe=AddParam(["head","core","arms","legs"],"耐EN防御")
        tmpHtml=tmpHtml+'耐EN防御:'+tmpTe+'(軽減率:'+(tmpTe-1000)/10+'%)<br>'

        //耐爆防御
        var tmpCe=AddParam(["head","core","arms","legs"],"耐爆防御")
        tmpHtml=tmpHtml+'耐爆防御:'+tmpCe+'(軽減率:'+(tmpCe-1000)/10+'%)<br>'

        //姿勢安定性能
        var tmpStability=AddParam(["head","core","legs"],"姿勢安定性能")
        tmpHtml=tmpHtml+'姿勢安定性能:'+tmpStability+'<br>'

        //安定回復補正　計算式不明

        //攻撃系------------------------------
        tmpHtml=tmpHtml+'<br>'

        //アシスト適正★
        var tmpFcsAssistShort=GetSelPartsParamNum("fcs","近距離アシスト適性")
        var tmpFcsAssistMiddle=GetSelPartsParamNum("fcs","中距離アシスト適性")
        var tmpFcsAssistLong=GetSelPartsParamNum("fcs","遠距離アシスト適性")
        tmpHtml=tmpHtml+'アシスト適正:'+tmpFcsAssistShort+','+tmpFcsAssistMiddle+','+tmpFcsAssistLong+'(近0~130m,中130~260m,遠260m~)<br>'
        
        //照準追従性能　計算式不明
        //照準追従性能(タゲアシON/OFF)も出したいが計算式不明

        //ミサイルロック:xx(ロック時間倍率xx%)
        var tmpFcsMissile=GetSelPartsParamNum("fcs","ミサイルロック補正")
        tmpHtml=tmpHtml+'ミサイルロック補正:'+tmpFcsMissile+'(ロック時間倍率'+(tmpFcsMissile-100)+'%)</br>'
        var tmpFcsMissileMlt=GetSelPartsParamNum("fcs","マルチロック補正")
        tmpHtml=tmpHtml+'マルチロック補正:'+tmpFcsMissileMlt+'(ロック時間倍率'+(tmpFcsMissileMlt-100)+'%)</br>'

        //射撃武器適正
        tmpHtml=tmpHtml+'射撃武器適正:'+tmpArmsRangedWeponCorr+'<br>'
        //近接武器適性★
        tmpHtml=tmpHtml+'近接武器適性:'+tmpArmsMeleeCorr+'(ATK:'+((tmpArmsMeleeCorr-100)/2)+'%)<br>'
        //EN射撃武器適正★
        tmpHtml=tmpHtml+'EN射撃武器適正:'+tmpEnWeponCorr
            +'(ATK:'+((tmpEnWeponCorr-100)/2)+'%,'+'CHG/RLD:'+(tmpEnWeponCorr-100)+'%)<br>'

        //移動系------------------------------
        tmpHtml=tmpHtml+'<br>'

        //ブースト速度　計算式不明
        //ブースト後退速度★　計算式不明
        //ホバー速度★　計算式不明
        //走行速度★　計算式不明
        //QB速度　計算式不明

        //QB消費EN
        var tmpQbConsumption=(GetSelPartsParamNum("booster","QB消費EN")*((200-tmpCoreCorrBooster)/100))
        tmpHtml=tmpHtml+'QB消費EN:'+Math.floor(tmpQbConsumption)+'<br>'
        //EN最大時QB可能回数★
        tmpHtml=tmpHtml+'QB可能回数:'+Math.ceil(tmpEnCapacity/tmpQbConsumption)+'<br>'
        
        //QBリロード時間　計算式不明
        //AB速度★　計算式不明
        //AB速度がわかれば、可能時間と合わせて移動距離出せるんだけど

        //AB消費EN★
        var tmpAbConsumption=GetSelPartsParamNum("booster","AB消費EN")
        tmpHtml=tmpHtml+'AB消費EN:'+tmpAbConsumption+'<br>'
        //EN最大時AB可能時間★
        tmpHtml=tmpHtml+'AB可能時間:'+(Math.floor((tmpEnCapacity/tmpAbConsumption)*100)/100)+'<br>'
        //AQB消費EN★
        var tmpAqbConsumption=(GetSelPartsParamNum("booster","QB消費EN")*(0.8))
        tmpHtml=tmpHtml+'AQB消費EN:'+Math.floor(tmpAqbConsumption)+'<br>'

        //近接攻撃速度★　計算式不明
        
        //近接攻撃消費EN★
        var tmpMbConsumption=(GetSelPartsParamNum("booster","QB消費EN")*(0.8))
        tmpHtml=tmpHtml+'近接攻撃消費EN:'+tmpMbConsumption+'<br>'
        
        //ブレキャン可能回数(近接B→QB→近接B→…)★
        //ループとかで計算は可能だけど、近接B開始かQB開始かでも変わるし、
        //EN満タンからブレキャンだけとかしなだそうだし別にいらんか…
        
        //EN系------------------------------
        tmpHtml=tmpHtml+'<br>'

        //EN容量
        tmpHtml=tmpHtml+'EN容量:'+tmpEnCapacity+'<br>'

        //EN負荷合計
        var tmpEnConsumptionSum=AddParam(selectedParts_arr,"EN負荷")

        //EN余剰
        //EN出力-EN負荷合計
        var tmpEnSurplus=tmpEnOutPut-tmpEnConsumptionSum

        //EN供給効率
        //EN余剰=1800以下:EN供給効率=1500+EN余剰*25/6
        //EN余剰=1800以上:9000+(EN余剰-1800)*75/17
        var tmpEnSupplyEfficiencies=Number(0)
        if(tmpEnSurplus<=1800){
            //1500 + EN余剰 * 25 / 6
            tmpEnSupplyEfficiencies=(1500+tmpEnSurplus*25/6);
        }else{
            //9000 + (余剰 - 1800) * 75 / 17
            tmpEnSupplyEfficiencies=(9000+(tmpEnSurplus-1800)*75/17);
        }
        //EN出力不足チェック
        //EN出力不足で100固定
        if(tmpEnSupplyEfficiencies<0){
            tmpEnSupplyEfficiencies=100;
            tmpHtmlErr=tmpHtmlErr+'EN出力不足<br>';
        }

        //EN補充遅延
        //1000/(EN補充性能*ジェネレータ供給補正*0.01)
        var tmpEnReplenishmentDelay=(1000/(tmpSupplyCorr*tmpCoreCorrEnOutput*0.01))
        //EN供給効率,EN補充遅延
        tmpHtml=tmpHtml+'EN供給効率:'+(Math.floor(tmpEnSupplyEfficiencies))
            +' / EN補充遅延:'+(Math.floor(tmpEnReplenishmentDelay*100)/100)+'<br>'

        //EN復元遅延★
        //1000/(供給復元性能*ジェネレータ供給補正*0.01)
        var tmpEnRestorationDelay=(1000/(tmpSupplyRestoration*tmpCoreCorrEnOutput*0.01))
        //復元時補充EN★,EN復元遅延★
        tmpHtml=tmpHtml+'復元時補充EN:'+tmpRestorationEn
            +' / EN復元遅延:'+(Math.floor(tmpEnRestorationDelay*100)/100)+'<br>'

        //積載系------------------------------
        tmpHtml=tmpHtml+'<br>'

        //総重量
        //75000ライン★
        var tmpTotalWeight=AddParam(selectedParts_arr,"重量")
        tmpHtml=tmpHtml+'総重量:'+tmpTotalWeight+'(75000まで:'+(75000-tmpTotalWeight)+')<br>'
        
        //腕部積載
        //腕部積載合計
        var tmpTotalLoadArms=(GetSelPartsParamNum("r_arm_unit","重量")+GetSelPartsParamNum("r_arm_unit","重量"))
        //腕部積載上限
        var tmpLoadlimitArms=GetSelPartsParamNum("arms","腕部積載上限")
        //腕部積載余り★
        //ハンガーは考慮できていない
        var tmpLoadCapaArms=(tmpLoadlimitArms-tmpTotalLoadArms)
        tmpHtml=tmpHtml+'腕部積載上限:'+tmpLoadlimitArms+'-合計:'+tmpTotalLoadArms+'=余り:'+tmpLoadCapaArms+'<br>'
        //腕部重量過多チェック
        //ハンガーは考慮できていない
        if((tmpLoadlimitArms-tmpTotalLoadArms)<0){
            tmpHtmlErr=tmpHtmlErr+'腕部重量過多<br>';    
        }

        //積載
        //積載合計
        var tmpTotalLoad=tmpTotalWeight-GetSelPartsParamNum("legs","重量")
        //積載上限
        var tmpLoadlimit=GetSelPartsParamNum("legs","積載上限")
        //積載余り★
        var tmpRemLoadCapa=tmpLoadlimit-tmpTotalLoad
        tmpHtml=tmpHtml+'積載上限:'+tmpLoadlimit+'-合計:'+tmpTotalLoad+'=余り:'+tmpRemLoadCapa+'<br>'
        //重量過多チェック
        if((tmpLoadlimit-tmpTotalLoad)<0){
            tmpHtmlErr=tmpHtmlErr+'重量過多<br>';
        }
        
        //EN系その2------------------------------
        tmpHtml=tmpHtml+'<br>'

        //EN負荷合計
        tmpHtml=tmpHtml+'EN負荷合計:'+tmpEnConsumptionSum+'<br>'
        //EN出力
        tmpHtml=tmpHtml+'EN出力:'+Math.floor(tmpEnOutPut)+'<br>'

        //------------------------------

        //エラーメッセージ
        if(tmpHtmlErr!=""){
            tmpHtml=tmpHtmlErr+'<br>'+tmpHtml
        }
        //------------------------------
    }

    //表示
    document.getElementById('spec_sheet_area').innerHTML=tmpHtml
}

//装備不完全チェック
function CheckIncompleteEquipment(){

    //HEAD未装備
    if(GetSelPartsParam("head","パーツ名")=='None'){return false}

    //CORE未装備
    if(GetSelPartsParam("core","パーツ名")=='None'){return false}

    //ARMS未装備
    if(GetSelPartsParam("arms","パーツ名")=='None'){return false}

    //LEGS未装備
    if(GetSelPartsParam("legs","パーツ名")=='None'){return false}

    //タンクでBOOSTER装備中
    if(GetSelPartsParam("legs","タイプ")=='タンク'){
        if(GetSelPartsParam("booster","パーツ名")!='None'){return false}}

    //BOOSTER未装備（タンク以外）
    if(GetSelPartsParam("booster","パーツ名")=='None'){
        if(GetSelPartsParam("legs","タイプ")!='タンク'){return false}}

    //FCS未装備
    if(GetSelPartsParam("fcs","パーツ名")=='None'){return false}

    //GENERATOR未装備
    if(GetSelPartsParam("generator","パーツ名")=='None'){return false}

    //チェックOK
    return true
}

//単純加算パラメータの計算
function AddParam(argCateArr,argParamNm){
    var tmpPartsMap=GetSelParts();
    var tmpRet=Number(0);
    var tmpPrm;
    argCateArr.forEach(ct => {
        tmpPrm=(tmpPartsMap.get(ct)).get(argParamNm);
        //undefined,nullを除外
        if(tmpPrm!=undefined){
            tmpRet=tmpRet+Number((tmpPartsMap.get(ct)).get(argParamNm));
        }
    });
    return tmpRet
}