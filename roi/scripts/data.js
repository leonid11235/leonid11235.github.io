// Array of Buildings Obj
// Each element contains building name and url to image
var Buildings = [];

var settingsData = {
    "userName": "",
    "userImg": ""
};

var documentsData = {
    "runningID": 2,
    "lastEdited": null
};

// Array of documents
var Documents = [
    {
        "id": 1,
        "createdDT": 0,
        "lastUpdate": 0,

        DocSettings: {
            "docName": "Test Document",
            "units": 300,
            "hourly": 20,
            "buildingID": "1",
            "buildingName":"Cooper And Cooper"
        },

        // Array of card objects 
        CategoryData: [
            {
                "id": 1,
                "cardActive": true,
                "title": "Title1",
                "timeSaving": 0,
                "timeSavingCalc": "((100 * 300 * 15)/100) * hourly",
                "timeSavingCalcDesc": "100 package entries/day * 300 days * 15 seconds/package entry (pre BuildingLink = 1 minute/entry) = 375 hours saved * $20/hour = $7,500 savings/year on labor for package tracking",
                "valueTimeSaved": 0,
                "valueTimeSavedCalc": "600",
                "valueTimeSavedCaldDesc": "600/year saved on ordering log books, paper, printing, and postage",
                "directCost": 0,
                "totalSave": 0
            },
            {
                "id": 2,
                "cardActive": true,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 3,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10            
            },
            {
                "id": 4,
                "cardActive": true,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 5,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 6,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            }
        ]
    },

    {
        "id": 2,
        "createdDT": 0,
        "lastUpdate": 0,
        "numCards": 6,

        DocSettings: {
            "docName": "Test Document2",
            "units": 350,
            "hourly": 20,
            "buildingID": "1",
            "buildingName":"Extell"
        },

        // Array of card objects 
        CategoryData: [
            {
                "id": 1,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 2,
                "cardActive": true,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 3,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10            
            },
            {
                "id": 4,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 5,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            },
            {
                "id": 6,
                "cardActive": false,
                "title": "Title1",
                "timeSaving": 10,
                "valueTimeSaved": 10,
                "directCost": 10,
                "totalSave": 10
            }
        ]
    }
    
]

var buildings = [
    {
        "id":1,
        "name": "Extell",
        "imgUrl": "images/building-logos/Extell.png"
    },
    {
        "id":2,
        "name": "Cooper and Cooper",
        "imgUrl": "images/building-logos/CooperAndCooper.jpg"
    }
]
