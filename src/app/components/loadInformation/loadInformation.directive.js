'use strict'

angular.module('metlifeApp.loadInformation.directives',['metlifeApp.loadInformation.services'])
	.directive('modal', ['ModalService', '$window', function(ModalService, $window){
		return{
			link: function(scope, elem, attrs){
				//Nos aseguramos que el id existe
				scope.$window = $window;
				
				if(!attrs.id){
					console.error("Ventana MODAL debe tener un ID.");
					return;
				}

				//Mueve el elemento al fondo de la página
				//Cambiar por ANGULARJS
				elem.appendTo('body');
				console.log(elem);
				//angular.element(document.body).append(elem);

				//Se agrega modal a ModalService para que sea accesible desde el controlador
				var modal = {
					id: attrs.id,
					open: Open,
					close: Close
				};
				ModalService.Add(modal);

				//Cierra ventana MODAL al hacer click fuera del cuadro
				/*elem.on('click', function(e){
					var target = $(e.target);
					if(!target.closest('.modal-body').length){
						scope.$evalAsync(Close);
					}
				});*/
				scope.$window.onclick = function(event){
					console.log("Se ha dado un click");
				};

				//Se elimina modal de ModalService
				scope.$on('$destroy', function(){
					ModalService.Remove(attrs.id);
					elem.remove();
				});

				//Abre ventana MODAL
				function Open(){
					elem.show();
					$('body').addClass('modal-open');
				}

				//Cierra ventana MODAL
				function Close(){
					elem.hide();
					$('body').removeClass('modal-open');
				}
			}
		};
	}]);