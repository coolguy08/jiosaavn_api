const GetLaunchData=()=>`https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=wap6dot0`;

const Search=(query)=>`https://www.jiosaavn.com/api.php?__call=autocomplete.get&query=${query}&_format=json&_marker=0&ctx=wap6dot0`;

const GetDetails=(id,type,page,n)=>`https://www.jiosaavn.com/api.php?__call=webapi.get&token=${id}&type=${type}&p=${page}&n=${n}&includeMetaTags=0&ctx=wap6dot0&api_version=4&_format=json&_marker=0`


const GetSongDetails=(pid)=>`https://www.jiosaavn.com/api.php?__call=song.getDetails&_marker=0%3F_marker%3D0&_format=json&pids=${pid}`;

const GetLyrics=(pid)=>`https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=${pid}`;

module.exports={
    GetLaunchData,
    Search,
    GetDetails,
    GetSongDetails,
    GetLyrics

};
