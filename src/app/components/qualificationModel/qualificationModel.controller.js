'use strict'

angular.module('metlifeApp.qualificationModel.controllers',[])
  .controller('ModelCreationController',['$scope', '$state', function($scope, $state){

    var GDV, variable, value;
    // Indexes for elements in the model
    $scope.isQualitative = 0;
    $scope.indexGDV = [0, 0];
    $scope.indexVariable = [0, 0];
    $scope.indexValue = [0, 0];

    $scope.editing = 0;

    // False list for TDSI
    $scope.sectores = [
        {
            label: 'Seleccione una opción',
            id: 0
        },
        {
            label: 'sector 1',
            id: 1
        },
        {   
            label: 'sector 2',
            id: 2
        },
        {   
            label: 'sector 3',
            id: 3
        },
        {   
            label: 'sector n',
            id: 4000
        }
    ];
    // we will store all of our form data in this object
    $scope.formData = 
        {
            analysis: [{GDV: []}, {GDV: []}],
            submitted: false,
            errorMessages: []
        };
    //$scope.formData.GDV = [];
    //********************************************************************//
    var fieldWithFocus;

    $scope.focus = function (fieldName) {
        fieldWithFocus = fieldName;
    };

    $scope.blur = function (fieldName) {
        fieldWithFocus = undefined;
    };

    $scope.isMessagesVisible = function (fieldName) {
        return fieldWithFocus === fieldName || $scope.formData.submitted;
    };
    //********************************************************************//
    function cleanGDV(){
        GDV = {
            id: -1,
            description: '',
            prom: 0,
            min: 0,
            max: 0,
            variables: []
        };
    }
    //********************************************************************//
    function cleanVariables(){
        variable =  {
            id: -1,
            description: '',
            prom: 0,
            min: 0,
            max: 0,
            values: []
        };
    }
    //********************************************************************//
    function cleanValues(){
        value = {
            id: -1,
            description: '',
            score: 0
        };
    }
    //********************************************************************//
    function getLastIndex(){}
    //********************************************************************//
    function initQualitativeAnalisis(){
        $scope.isQualitative = 1;
        $scope.addGDV(0);
        //$state.go('qualificationModel.new.part6');
    }
    //********************************************************************//
    $scope.addGDV = function(mode){
        var anlsType = $scope.isQualitative;
        var indexGDV = $scope.indexGDV[anlsType];
        
        if(mode == 1){
            $scope.indexVariable[anlsType] = 0;
            $scope.indexValue[anlsType] = 0;
        }

        //console.log($scope.indexGDV + ' ' + $scope.indexVariable + ' ' + $scope.indexValue);
        cleanGDV();

        if($scope.formData.analysis[anlsType].GDV[indexGDV]){
            $scope.formData.analysis[anlsType].GDV[indexGDV] = GDV;
        }
        else{
            $scope.formData.analysis[anlsType].GDV.push(GDV);
        }

        $scope.formData.analysis[anlsType].GDV[indexGDV].id = indexGDV;


        if($scope.isQualitative == 0){
            $state.go('addQualificationModel.part2');
        }
        else{
            $state.go('addQualificationModel.part6');
        }
    }
    //********************************************************************//
    $scope.addVariables = function(mode){
        var anlsType = $scope.isQualitative;
        var indexGDV = $scope.indexGDV[anlsType];
        var indexVar = $scope.indexVariable[anlsType];

        if(mode == 1){
            $scope.indexValue[anlsType] = 0;
        }

        //console.log($scope.indexGDV + ' ' + $scope.indexVariable + ' ' + $scope.indexValue);
        cleanVariables();

        if($scope.formData.analysis[anlsType].GDV[indexGDV].variables[indexVar]){
            $scope.formData.analysis[anlsType].GDV[indexGDV]
                                .variables[indexVar] = variable;
        }
        else{
            $scope.formData.analysis[anlsType].GDV[indexGDV].variables.push(variable);
        }

        $scope.formData.analysis[anlsType].GDV[indexGDV]
                            .variables[indexVar].id = indexVar;

        if($scope.isQualitative == 0){
            $state.go('addQualificationModel.part3');
        }
        else{
            $state.go('addQualificationModel.part7');
        }
    }
    //********************************************************************//
    $scope.addValues = function(mode){
        var anlsType = $scope.isQualitative;
        var indexGDV = $scope.indexGDV[anlsType];
        var indexVar = $scope.indexVariable[anlsType];
        var indexVal = $scope.indexValue[anlsType];
        //console.log($scope.indexGDV + ' ' + $scope.indexVariable + ' ' + $scope.indexValue);
        cleanValues();

        if($scope.formData.analysis[anlsType].GDV[indexGDV].variables[indexVar].values[indexVal])
            $scope.formData.analysis[anlsType].GDV[indexGDV]
                                .variables[indexVar]
                                    .values[indexVal] = value;
        else
            $scope.formData.analysis[anlsType].GDV[indexGDV]
                                .variables[indexVar].values.push(value);

        $scope.formData.analysis[anlsType].GDV[indexGDV]
                            .variables[indexVar]
                                .values[indexVal].id = indexVal;

        if($scope.isQualitative == 0){
            $state.go('addQualificationModel.part4');
        }
        else{
            $state.go('addQualificationModel.part8');
        }
    }
    //********************************************************************//
    
    //********************************************************************//
    $scope.newGDV = function(){
        //validations
        $scope.indexGDV[$scope.isQualitative]++;
        $scope.addGDV(1);
    };
    //********************************************************************//
    $scope.newVariable = function(){
        //validations
        $scope.indexVariable[$scope.isQualitative]++;
        $scope.addVariables(1);
    };
    //********************************************************************//
    $scope.newValue = function(){
        //validations
        $scope.indexValue[$scope.isQualitative]++;
        $scope.addValues(1);
    }
    //********************************************************************//
    $scope.editRow = function(indexGDV,indexVariable,indexValue,formNumber){
        /*console.log('Leido => ' + indexGDV + ' ' 
            + indexVariable + ' ' + indexValue + ' ' + formNumber);*/
        $scope.editing = 1;

        $scope.indexGDV[$scope.isQualitative] = indexGDV;
        $scope.indexVariable[$scope.isQualitative] = indexVariable;
        $scope.indexValue[$scope.isQualitative] = indexValue;

        if( (formNumber >= 2 && formNumber <= 4) || (formNumber >= 6 && formNumber <= 8) ){
            $state.go('addQualificationModel.part' + formNumber);
        }
        /*if(formNumber == 2){
            $state.go('qualificationModel.modelNew.part2');
        }else if(formNumber == 3){
            $state.go('qualificationModel.modelNew.part3');
        }else if(formNumber == 4){
            $state.go('qualificationModel.modelNew.part4');
        }*/else{
            console.log('Código incorrecto.');
        }
    }
    //********************************************************************//
    $scope.rowUpdated = function(){
        $scope.editing = 0;

        $scope.isQualitative == 0 ? $state.go('addQualificationModel.part5') : $state.go('addQualificationModel.part9');
    }
    //********************************************************************//
    //********************************************************************//
    // function to process the form
    $scope.sendQualificationModel = function(){

        if($scope.isQualitative == 0){
            initQualitativeAnalisis();
        }
        else{
            alert("Modelo de calificación enviado");

            $state.go('qualificationModel');
        }
        /*
        $http({
            method  : 'model',
            url     : 'myUrl.com',
            data    : $.param($scope.formData),
            // set the headers so angular passing info as form data (not request payload)
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(data){
                console.log(data);

                if(!data.success){
                    // if not successful, bind errors to error variables
                    $scope.errorVar1 = data.errors.var1;
                    $scope.errorVar2 = data.errors.var2;
                    $scope.errorVarN = data.errors.varn;
                }else{
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
            });
        */
        /*
        //The other syntax (and cleaner)
        $http.model('myUrl.com', $scope.formData)
            .success(function(data){...});
        */
    };
}]).controller('HoverFormController', ['$scope',  function($scope){
    function getButtonValue(elem){
        if(elem == 1)
            return 'Nombre y Descripción';
        else if(elem == 2)
            return 'Grupos de variables (Cuantitativo)';
        else if(elem == 3)
            return 'Variables (Cuantitativo)';
        else if(elem == 4)
            return 'Valores (Cuantitativo)';
        else if(elem == 5)
            return 'Reporte previo (Cuantitativo)';
        else if(elem == 6)
            return 'Grupos de variables (Cualitativo)';
        else if(elem == 7)
            return 'Variables (Cualitativo)';
        else if(elem == 8)
            return 'Valores (Cualitativo)';
        else if(elem == 9)
            return 'Reporte previo (Cualitativo)';

        return 'NULL';
    }

    $scope.hoverIn = function(elem){
        this.hoverShow = true;
        this.buttonValue = getButtonValue(elem);
    };

    $scope.hoverOut = function(elem){
        this.hoverShow = false;
        this.buttonValue = getButtonValue(elem);
    };
}]).controller('UpdateModelController',['$scope','$state', function($scope, $state){
    ///////////////////////////////////////
    //***  For TESTING - List created ***//
    ///////////////////////////////////////
    var obj1 = {Nombre: 'Modelo de calificación número 1', ID: '0', Op: 'Editar' };
    var obj2 = {Nombre: 'Modelo de calificación número 2', ID: '1', Op: 'Editar'};
    var obj3 = {Nombre: 'Modelo de calificación número 3', ID: '2', Op: 'Editar'};
    
    $scope.title = 'Modelos de calificación';

    $scope.listOfObjects = [];
    $scope.listOfObjects.push(obj1);
    $scope.listOfObjects.push(obj2);
    $scope.listOfObjects.push(obj3);

    var col1 = 'ID';
    var col2 = 'Nombre';
    var col3 = 'Op';

    $scope.listDescription = { numberOfRows: 0, numberOfCols: 0, listOfColumns: [] };
    $scope.listDescription.numberOfRows = 3;
    $scope.listDescription.numberOfCols = 2;

    $scope.listDescription.listOfColumns.push(col1);
    $scope.listDescription.listOfColumns.push(col2);
    $scope.listDescription.listOfColumns.push(col3);

    $scope.buttonFunction = 'updateModel(object.ID)';
    $scope.areAnalysisChecked = 0;

    $scope.getRow = function(id){
        console.log(id);
        if(id == 2){
            //función para obtener todo el modelo
            $scope.analysisTitle = 'Análisis cuantitativo',
            $state.go('updateQualificationModel.cuantitative');
        }
    };

    ///////////////////////////////////////
    function value(){
        this.id = -1,
        this.editingDescription = false,
        this.editingScore = false,
        this.description = '',
        this.score = 0
    };

    function variable(){
        this.id = -1,
        this.editingDescription = false,
        this.editingProm = false,
        this.editingMin = false,
        this.editingMax = false,
        this.description = '',
        this.prom = 0,
        this.min = 0,
        this.max = 0,
        this.variableType = '';
        this.values = []
    };

    function GDV(){
        this.id = -1,
        this.editingDescription = false,
        this.editingProm = false,
        this.editingMin = false,
        this.editingMax = false,
        this.description = '',
        this.prom = 0,
        this.min = 0,
        this.max = 0,
        this.variables = []
    };

    function model(){
        this.GDVs = []
    }

    $scope.formData = 
    {
        analysis: [],
        submitted: false,
        errorMessages: []
    };

    var m1 = new model();
    var m2 = new model();
    $scope.formData.analysis.push(m1);
    $scope.formData.analysis.push(m2);

    /////////////////////////////////////////////////////
    //*** For TESTING - Table created - Qualitative ***//
    /////////////////////////////////////////////////////
    var valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Leverage Aaa';
    valueTMP0.score = 100;
    var valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Leverage Aa';
    valueTMP1.score = 90;
    var valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Leverage A';
    valueTMP2.score = 75;
    var valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Leverage Baa';
    valueTMP3.score = 60;
    var valueTMP4 = new value();
    valueTMP4.id = 4;
    valueTMP4.editing = false;
    valueTMP4.description = 'Leverage Ba';
    valueTMP4.score = 45;
    var valueTMP5 = new value();
    valueTMP5.id = 5;
    valueTMP5.editing = false;
    valueTMP5.description = 'Leverage B';
    valueTMP5.score = 30;
    var valueTMP6 = new value();
    valueTMP6.id = 6;
    valueTMP6.editing = false;
    valueTMP6.description = 'Leverage Caa';
    valueTMP6.score = 15;

    var variableTMP1 = new variable();
    variableTMP1.id = 0;
    variableTMP1.editing = false;
    variableTMP1.description = 'Leverage';
    variableTMP1.prom = 50;
    variableTMP1.min = 45;
    variableTMP1.max = 55;
    variableTMP1.variableType = 'D';
    variableTMP1.values.push(valueTMP0);
    variableTMP1.values.push(valueTMP1);
    variableTMP1.values.push(valueTMP2);
    variableTMP1.values.push(valueTMP3);
    variableTMP1.values.push(valueTMP4);
    variableTMP1.values.push(valueTMP5);
    variableTMP1.values.push(valueTMP6);

    valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Leverage neto Aaa';
    valueTMP0.score = 100;
    valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Leverage neto Aa';
    valueTMP1.score = 90;
    valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Leverage neto A';
    valueTMP2.score = 75;
    valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Leverage neto Baa';
    valueTMP3.score = 60;
    valueTMP4 = new value();
    valueTMP4.id = 4;
    valueTMP4.editing = false;
    valueTMP4.description = 'Leverage neto Ba';
    valueTMP4.score = 45;
    valueTMP5 = new value();
    valueTMP5.id = 5;
    valueTMP5.editing = false;
    valueTMP5.description = 'Leverage neto B';
    valueTMP5.score = 30;
    valueTMP6 = new value();
    valueTMP6.id = 6;
    valueTMP6.editing = false;
    valueTMP6.description = 'Leverage neto Caa';
    valueTMP6.score = 15;

    var variableTMP2 = new variable();
    variableTMP2.id = 1;
    variableTMP2.editing = false;
    variableTMP2.description = 'Deuda Neta/EBITDA';
    variableTMP2.prom = 25;
    variableTMP2.min = 20;
    variableTMP2.max = 30;
    variableTMP2.variableType = 'D';
    variableTMP2.values.push(valueTMP0);
    variableTMP2.values.push(valueTMP1);
    variableTMP2.values.push(valueTMP2);
    variableTMP2.values.push(valueTMP3);
    variableTMP2.values.push(valueTMP4);
    variableTMP2.values.push(valueTMP5);
    variableTMP2.values.push(valueTMP6);

    valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Endeudamiento Aaa';
    valueTMP0.score = 100;
    valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Endeudamiento Aa';
    valueTMP1.score = 90;
    valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Endeudamiento A';
    valueTMP2.score = 75;
    valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Endeudamiento Baa';
    valueTMP3.score = 60;
    valueTMP4 = new value();
    valueTMP4.id = 4;
    valueTMP4.editing = false;
    valueTMP4.description = 'Endeudamiento Ba';
    valueTMP4.score = 45;
    valueTMP5 = new value();
    valueTMP5.id = 5;
    valueTMP5.editing = false;
    valueTMP5.description = 'Endeudamiento B';
    valueTMP5.score = 30;
    valueTMP6 = new value();
    valueTMP6.id = 6;
    valueTMP6.editing = false;
    valueTMP6.description = 'Endeudamiento Caa';
    valueTMP6.score = 15;

    var variableTMP3 = new variable();
    variableTMP3.id = 2;
    variableTMP3.editing = false;
    variableTMP3.description = 'Deuda Total/Patrimonio';
    variableTMP3.prom = 25;
    variableTMP3.min = 20;
    variableTMP3.max = 30;
    variableTMP3.variableType = 'D';
    variableTMP3.values.push(valueTMP0);
    variableTMP3.values.push(valueTMP1);
    variableTMP3.values.push(valueTMP2);
    variableTMP3.values.push(valueTMP3);
    variableTMP3.values.push(valueTMP4);
    variableTMP3.values.push(valueTMP5);
    variableTMP3.values.push(valueTMP6);

    var GDVtmp = new GDV();
    GDVtmp.id = 0;
    GDVtmp.editing = false;
    GDVtmp.description = 'Endeudamiento';
    GDVtmp.prom = 35;
    GDVtmp.min = 25;
    GDVtmp.max = 45;
    GDVtmp.variables.push(variableTMP1);
    GDVtmp.variables.push(variableTMP2);
    GDVtmp.variables.push(variableTMP3);

    $scope.formData.analysis[0].GDVs.push(GDVtmp);

    /////////////////////////////////////////////////////
    //*** For TESTING - Table created - Quantitative ***//
    /////////////////////////////////////////////////////
    valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Menor a $0.5bn';
    valueTMP0.score = 15;
    
    valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Entre $0.5-$2bn';
    valueTMP1.score = 30;
    
    valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Entre $2-$5bn';
    valueTMP2.score = 45;
    
    valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Entre $5-$10bn';
    valueTMP3.score = 60;
    
    valueTMP4 = new value();
    valueTMP4.id = 4;
    valueTMP4.editing = false;
    valueTMP4.description = 'Entre $10-$30bn';
    valueTMP4.score = 75;
    
    valueTMP5 = new value();
    valueTMP5.id = 5;
    valueTMP5.editing = false;
    valueTMP5.description = 'Entre $30-$80bn';
    valueTMP5.score = 90;
    
    valueTMP6 = new value();
    valueTMP6.id = 6;
    valueTMP6.editing = false;
    valueTMP6.description = 'Mayor que $80bn';
    valueTMP6.score = 100;

    variableTMP1 = new variable();
    variableTMP1.id = 0;
    variableTMP1.editing = false;
    variableTMP1.description = 'Ventas Anuales';
    variableTMP1.prom = 50;
    variableTMP1.min = 45;
    variableTMP1.max = 55;
    variableTMP1.values.push(valueTMP0);
    variableTMP1.values.push(valueTMP1);
    variableTMP1.values.push(valueTMP2);
    variableTMP1.values.push(valueTMP3);
    variableTMP1.values.push(valueTMP4);
    variableTMP1.values.push(valueTMP5);
    variableTMP1.values.push(valueTMP6);

    valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Internacional Global';
    valueTMP0.score = 100;

    valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Internacional Regional';
    valueTMP1.score = 75;

    valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Nacional';
    valueTMP2.score = 50;

    valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Regional';
    valueTMP3.score = 25;

    var variableTMP2 = new variable();
    variableTMP2.id = 1;
    variableTMP2.editing = false;
    variableTMP2.description = 'Presencia en mercados';
    variableTMP2.prom = 25;
    variableTMP2.min = 20;
    variableTMP2.max = 30;
    variableTMP2.values.push(valueTMP0);
    variableTMP2.values.push(valueTMP1);
    variableTMP2.values.push(valueTMP2);
    variableTMP2.values.push(valueTMP3);

    valueTMP0 = new value();
    valueTMP0.id = 0;
    valueTMP0.editing = false;
    valueTMP0.description = 'Líder';
    valueTMP0.score = 100;

    valueTMP1 = new value();
    valueTMP1.id = 1;
    valueTMP1.editing = false;
    valueTMP1.description = 'Alta';
    valueTMP1.score = 75;

    valueTMP2 = new value();
    valueTMP2.id = 2;
    valueTMP2.editing = false;
    valueTMP2.description = 'Media';
    valueTMP2.score = 50;

    valueTMP3 = new value();
    valueTMP3.id = 3;
    valueTMP3.editing = false;
    valueTMP3.description = 'Baja';
    valueTMP3.score = 25;

    var variableTMP3 = new variable();
    variableTMP3.id = 2;
    variableTMP3.editing = false;
    variableTMP3.description = 'Cuota Principal de Mercado';
    variableTMP3.prom = 25;
    variableTMP3.min = 20;
    variableTMP3.max = 30;
    variableTMP3.values.push(valueTMP0);
    variableTMP3.values.push(valueTMP1);
    variableTMP3.values.push(valueTMP2);
    variableTMP3.values.push(valueTMP3);

    var GDVtmp = new GDV();
    GDVtmp.id = 0;
    GDVtmp.editing = false;
    GDVtmp.description = 'Escala de Operaciones';
    GDVtmp.prom = 25;
    GDVtmp.min = 15;
    GDVtmp.max = 35;
    GDVtmp.variables.push(variableTMP1);
    GDVtmp.variables.push(variableTMP2);
    GDVtmp.variables.push(variableTMP3);

    $scope.formData.analysis[1].GDVs.push(GDVtmp);

    ///////////////////////////////////////////////////////////////////////////////////////////

    $scope.nextAnalysis = function(){
        $scope.areAnalysisChecked = 1;
        $scope.analysisTitle = 'Análisis cualitativo',

        $state.go('updateQualificationModel.cualitative');        
    };

    ///////////////////////////////////////////////////////////////////////////////////////////

    $scope.update = function(){
        alert("Modelo de calificación actualizado");

        $state.go('qualificationModel');
    };

    ///////////////////////////////////////
    //*** Functions for table editing ***//
    ///////////////////////////////////////
    $scope.editDescription = function (item) {
        item.editingDescription = true;
    };

    $scope.doneEditingDescription = function (item) {
        item.editingDescription = false;
        //dong some background ajax calling for persistence...
    };

    $scope.editProm = function(item){
        item.editingProm = true;
    };

    $scope.doneEditingProm = function (item) {
        item.editingProm = false;
        //dong some background ajax calling for persistence...
    };

    $scope.editMin = function(item){
        item.editingMin = true;
    };

    $scope.doneEditingMin = function (item) {
        item.editingMin = false;
        //dong some background ajax calling for persistence...
    };

    $scope.editMax = function(item){
        item.editingMax = true;
    };

    $scope.doneEditingMax = function (item) {
        item.editingMax = false;
        //dong some background ajax calling for persistence...
    };

    $scope.editScore = function(item){
        item.editingScore = true;
    }

    $scope.doneEditingScore = function(item){
        item.editingScore = false;   
    }
}]);