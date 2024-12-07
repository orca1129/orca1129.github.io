console.log("js読込 template.js")

//なんか上手く動かないので後回し
//パーツ選択とパーツリストはテンプレート用意してループ処理とかでやったほうが見やすいでしょう。多分。

function PartsSelectTemplate(argCate){
    var temp=""
    temp=
    '<details id="details_'+argCate+'">'+
        '<summary>'+argCate+':'+
            '<select id="parts_select_'+argCate+'" onchange="SelOnChange(\''+argCate+'\',\'parts_select_'+argCate+'\',\'parts_details_'+argCate+'\')">'+
            '</select>'+
        '</summary>'+
        '<div id="parts_details_'+argCate+'"></div>'+
    '</details>'
    return temp
}

function PartsListTemplate(argCate){}