function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "G:\InstalledPrograms-PS.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
                document.getElementById("current").innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}