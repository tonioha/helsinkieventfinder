const dateFormat = (date, loc) => {
    console.log(loc);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (loc === "fi") { days = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    let mins = d.getMinutes();
    if (mins < 10) { mins = "0" + mins }
    const dayOfWeek = d.getDay();
    const dString = `${days[dayOfWeek]} ${hours}:${mins} ${day}.${month}.${year}`;

    return dString;
};

const checkDate = (date, loc) => {
    if (!date) { return null };

    return dateFormat(date, loc);
}

const createTagsObject = (tags) => {
    let tagObj = [];
    let tagArr = [];

    for (let x in tags) {
        let item = tags[x][0].toUpperCase() + tags[x].slice(1);
        if (!tagArr.includes(item)) {
            tagArr.push(item);
        }
    }

    tagArr.sort();

    tagArr.forEach(item => tagObj.push({
        "label": item,
        "value": item
    }));

    return tagObj;
}

const sortData = (data, locale) => {
    data.sort((a, b) => {
        if (locale === "en" && a.name.en && b.name.en) {
            a = a.name.en.toLowerCase().trim();
            b = b.name.en.toLowerCase().trim();
        } else if (locale === "fi" && a.name.fi && b.name.fi) {
            a = a.name.fi.toLowerCase().trim();
            b = b.name.fi.toLowerCase().trim();
        }

        return a < b ? -1 : a > b ? 1 : 0;
    });

    return data;
};

const shortenText = (string, length) => {
    if (!string) { return; }
    if (string.length <= length) { return string; }
    const shortenedText = string.substring(0, length);
    return shortenedText + "...";
};

const keyExtractor = (item) => {
    return item.id.toString();
};


module.exports = {
    checkDate,
    dateFormat,
    sortData,
    createTagsObject,
    shortenText,
    keyExtractor
};  