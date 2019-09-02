(function(){
   angular
     .module('contactApp')
     .controller('contactCtrl',ContactCtrl);

     ContactCtrl.$inject=['$http'];


     function ContactCtrl($http){
		var vm = this;
		vm.addContact =  addContact;
		vm.update = updateContact;
		vm.contactDetails;
	 	vm.edit = editContact;
		vm.remove =  removeContact;
		vm.contactEdit = false;
		vm.clear = clear;
     	
         var refreshData = function(){
		        $http.get('/contacts/getContacts').then(function(response){
		           vm.contactLists = response.data;
		           //console.log(response);
		         });
          }

         //call refresh data each time application loads
          refreshData();

      

        function addContact(){
        
        	var contactDetails =  vm.contactDetails;
           $http.post('contacts/saveContact',contactDetails).then(function(response){
              //calling refresh data to get all the data from db after data is successfully uploaded in db
             clear();
             refreshData(); 
           });
        
        }

        function editContact(id){
            vm.updateContact = true;
           $http.get('/contacts/getContact/'+ id).then(function(response){
             vm.contactDetails = response.data;
           //  console.log(response);
           });
        }

        function updateContact(){
        var selectedContactId = vm.contactDetails._id;
        //console.log(selectedContactId);
         $http.put('/contacts/manageContact/'+selectedContactId,vm.contactDetails).then(function(response){
              clear();
             refreshData();
         });
        }

        function removeContact(id){
           $http.delete('contacts/manageContact/'+id).then(function(response){
              console.log(id + ' ID has been deleted successfully!');
              refreshData();
           });
        }

        function clear(){
        	console.log('clear');
        	vm.contactDetails = undefined;
        	vm.updateContact = false;
        }
      }

     
})();