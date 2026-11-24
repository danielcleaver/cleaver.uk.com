function capitalize(s){
    // This function capitalizes the first letter of each word of the string
    if(s==='')return s;
    if(s[0]===' ')return s;

    const parts=s.split(' ');

    parts.forEach((part,index) => {
        parts[index]=part[0].toUpperCase() + part.slice(1);
    });

    return parts.join(' ');
}