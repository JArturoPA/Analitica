'use strict'

angular.module('metlifeApp.loadInformation.controllers',['metlifeApp.loadInformation.services'])
    .controller('ModalCtrl', ['$scope', '$window', 'ModalService', function($scope, $window, ModalService){
        $scope.id = '';
        $scope.desc = '';
        $scope.modalWindow = false;
        $scope.$window = $window

        $scope.openModal = function(){
            //ModalService.Open(id);
            console.log("Entra a open");
            $scope.modalWindow = true;
            render();
        };

        $scope.hideModal = function(){
            //ModalService.Close(id);
            console.log("Entra a close");
            $scope.modalWindow = false;
            render();
        };

        function render(){
            if($scope.modalWindow){
                $scope.$window.onclick = function(event){
                    console.log("Se ha dado un click");
                    closeWindowIfClickedElsewhere(event);
                };
            }
            else{
                $scope.$window.onclick = null;
                $scope.$apply();
            }
        }

        function closeWindowIfClickedElsewhere(event){
            var clickedElement = event.target;
            if (!clickedElement) return;

            var elementClasses = clickedElement.classList;
            var clickedOnSearchDrawer = elementClasses.contains('btn-modal') || 
                                        elementClasses.contains('custom-modal') || 
                                        (clickedElement.parentElement !== null && 
                                         clickedElement.parentElement.classList.contains('custom-modal'));

            if (!clickedOnSearchDrawer) {
                $scope.modalWindow = !$scope.modalWindow;
                render();
                return;
            }
        }
    }])
    .controller('AddLayoutController',['$scope', '$state', function($scope, $state){

  	function group(){
  		this.id = -1,
        this.description = '',
        this.startingDate = '',
        this.expirationDate = '',
        this.enabled = true
  	};

  	function subgroup(){
  		this.groupId = -1,
  		this.subgroupId = -1,
        this.description = '',
        this.startingDate = '',
        this.expirationDate = '',
        this.enabled = true
  	};

  	function account(){
  		this.subgroupDescription = '',
  		this.description = '',
  		this.level = 1,
  		this.shortName = '',
  		this.factor = 1,
  		this.column = ''
  	};

  	function detail(){
  		this.group = new group(),
  		this.subgroup = [],
  		this.account = []
  	};

  	$scope.groups = [];
  	$scope.groupIndex = 0;
  	$scope.id = 'a';
  	$scope.desc = 'b';

  	$scope.formData = 
  	{
  		id: -1,
  		description: '',
  		detail: []
  	};

  	$scope.formData.detail.push( new detail() );

  	$scope.clearGroup = function(){
  		$scope.id = "";
  		$scope.desc = "";
  	}
    
  	//$scope.newGroup = function(a, b){
  	$scope.newGroup = function(){

  		/*if(a == null || b == null || a.length == 0 || b.length == 0){
  			console.log("Entra aquí");

  			//Cargar mensaje de error

  			return;
  		}*/
  		console.log($scope);
  		var tmpgroup = new group();
  		/*tmpgroup.id = a;
  		tmpgroup.description = b;*/
  		$scope.groups.push( tmpgroup );
  		$scope.groupIndex++;

  		//$scope.$apply(function(){
  			/*$scope.id = null;
  			$scope.desc = null;*/
  		//});
  	};
}]);