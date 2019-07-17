var sessionDocuments = null;
var sessionDocumentsInfo = null;
var curDocId = null;
var curDocIndex = null;
var $checkArray = $(".form-check-input");	// Array of checkboxes

var editPage = {
    sessionDocuments: "",
    sessionDocumentsInfo: "",
    
    init: function() {

        // If not stored, store in localstorage
        if(localStorage.getItem("data") === null)
            localStorage.setItem("data", JSON.stringify(Documents));
        sessionDocuments = JSON.parse(localStorage.getItem("data"));

        // If not stored, store the documentsData in localStorage
        if(localStorage.getItem("docInfoData") === null)
            localStorage.setItem("docInfoData", JSON.stringify(documentsData));
        sessionDocumentsInfo = JSON.parse(localStorage.getItem("docInfoData"));
        
        // Initalize the doc id we are working with
        curDocId = sessionDocumentsInfo.lastEdited;
        this.getCurDocIndex();

        // Render data in the HTML
        $('#blg-name').html(sessionDocuments[curDocIndex].DocSettings.buildingName);
        $('#doc-name').html(sessionDocuments[curDocIndex].DocSettings.docName);
        // These values should be in data.js to reduce calculations
        $('#total-summary').html(summary.getAnnualSavings());
        $('#sub-fee').html(summary.getYearlySubFee());
        $('#net-sum').html(summary.getNetAnnualSavings());
        alert("init before add cards");
        cardFunctions.intitAddCards();

        // Card functions
        cardFunctions.checkboxPrompt();
    },
    getCurDocIndex: function() {
        curDocIndex = findWithAttr(sessionDocuments, "id", curDocId);
    }
};

var cardFunctions = {
    checkSingleBox: function() {

    },
    addCard: function(cardID) {
        var cardDOMID = "card_" + cardID;

        this.cardCalculations();

        var cardIndex = this.getCardIndex(cardID);
        // alert(sessionDocuments[curDocId].CategoryData[cardIndex].timeSaving);
        var obj = 
            '<div class="card inline-block box" id="'+ cardDOMID +'">'+
                '<div class="card-header">' +
                        '<h5 class="card-title editable-text">' + "" + '</h5>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush">'+
                        '<li class="list-group-item"><span class="editable-text">'+
                            'Time saving'+
                            '</span>: <span class="float-right">'+
                                '<span id="timeSave1" class="editable-num" >' + sessionDocuments[curDocId].CategoryData[cardIndex].timeSaving + '</span><span> hours</span>'+
                            '</span>'+
                        '</li>'+
                        '<li class="list-group-item">'+
                            'Value of time saved: '+
                            '<span class="float-right">'+
                                '$<span id="vs1" class="valueSaved">' + sessionDocuments[curDocId].CategoryData[cardIndex].valueTimeSaved + '</span>'+
                            '</span>'+
                        '</li>'+
                        '<li class="list-group-item">'+
                            'Direct cost savings: '+
                            '<span class="float-right">'+
                                '$<span id="direct1" class="editable-num">0</span>'+
                            '</span>'+
                        '</li>'+
                        '<li class="list-group-item">'+
                            'Total monetary savings: '+
                            '<span class="float-right">'+
                                '$<span id="packageSummary" class="totalBoxes">0</span>'+
                            '</span>'+
                        '</li>'+
                    '</ul>'+
                '</div>';
                alert(sessionDocuments[curDocId].CategoryData[cardIndex].title);
        $(".box-container").append(obj);
    },
    removeCard: function() {

    },
    removeAllCards: function() {
        for (var i = 0; i < sessionDocuments[curDocIndex].CategoryData.length; i++) {
            // Turn the state to not active
            sessionDocuments[curDocIndex].CategoryData.cardActive = false;
            $('.box').remove();
        }
        // ** Update checkbox UI

        this.checkboxPrompt();
    },
    addAllCards: function() {
        var checkCount = 0;
        for (var i = 0; i < sessionDocuments[curDocIndex].CategoryData.length; i++) {
            if(sessionDocuments[curDocIndex].CategoryData[i].cardActive === true) {
                checkCount++;
            }
        }
        
        if (checkCount = sessionDocuments[curDocIndex].CategoryData.length - 1) {
            alert("All checked");
        } else {
            for (var i = 0; i < sessionDocuments[curDocIndex].CategoryData.length; i++) {
                if(sessionDocuments[curDocIndex].CategoryData[i].cardActive === true) {
                    // Turn the state to active
                    sessionDocuments[curDocIndex].CategoryData[i].cardActive = true;
                    this.addCard(sessionDocuments[curDocIndex].CategoryData[i].id);
                    // localStorage.setItem("data", JSON.stringify(sessionDocuments));
                }
            }
        }
        this.checkboxPrompt();
        // ** Update checkbox UI
    },
    toggleAllCards: function() {

    },
    intitAddCards: function() {
        for (var i = 0; i < sessionDocuments[curDocIndex].CategoryData.length; i++) {
            if(sessionDocuments[curDocIndex].CategoryData[i].cardActive === true) {
                // Turn the state to active
                sessionDocuments[curDocIndex].CategoryData[i].cardActive = true;
                this.addCard(sessionDocuments[curDocIndex].CategoryData[i].id);
                // localStorage.setItem("data", JSON.stringify(sessionDocuments));
            }
        }
    },
    checkboxPrompt: function() {
        if ($('.box-container div').length === 0)
            $(".emptyInd").show();
        else
            $(".emptyInd").hide();
    },
    getCardIndex: function(cardID) {
        var tempArray = sessionDocuments[curDocIndex].CategoryData; // Get array
        console.log(tempArray);
        return findWithAttr(tempArray, "id", cardID); // Get index
    },
    cardCalculations: function() {
        // When card added run calculations for it...
    }
};

var summary = {
    getAnnualSavings: function() {
        var annualSavings = 0;

        for (var i = 0; i < sessionDocuments[curDocIndex].CategoryData.length; i++) {
            if (sessionDocuments[curDocIndex].CategoryData[i].cardActive) {
                annualSavings += sessionDocuments[curDocIndex].CategoryData[i].totalSave;
            }
        }

        return annualSavings;
    },
    getYearlySubFee: function() {
        return 2 * sessionDocuments[curDocIndex].DocSettings.hourly * 12;
    },

    getNetAnnualSavings: function() {
        return this.getAnnualSavings() - this.getYearlySubFee();
    }
};

// Find the index given a JS object attribute and value
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return - 1;
}

editPage.init();