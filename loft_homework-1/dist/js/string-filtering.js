const string = "Привет! Как дела?";

const vowels = ["у", "е", "ы", "а", "о", "э", "ё", "я", "и"]; 

const getVowels = stringToFilter => {
    let extractedVolwes = ""

    for (let i = 0; i < stringToFilter.lenght; i++){
        const currentLetter = stringToFilter[i].toLowerCase();

        if(vowels.includes(currentLetter)){
            extractedVolwes += currentLetter;
        }
        console.log(currentLetter);

    }
    return extractedVolwes;

}

console.log(getVowels(string));