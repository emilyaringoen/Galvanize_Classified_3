(function() {

  angular.module('app')
    .service('classService',  service)

    service.$inject = ['$http']
    function service($http) {
      const sm = this
      sm.getClass = getClass
      sm.addClass = addClass
      sm.editClass = editClass
      sm.deleteClass = deleteClass

      function getClass(id) {
        return $http.get(id ? `/api/classifieds/${id}` : '/api/classifieds').then((classifieds) => {
          return classifieds.data
        })
      }

      function addClass(post) {
        return $http.post('/api/classifieds', post).then((classified) => {
          return classified.data
        })
      }


      function editClass(id, classified) {
        return $http.patch(`/api/classifieds/${id}`, classified).then((classified) => {
          console.log('3 in service', classified)
          return classified.data
        })
      }

      function deleteClass(id) {
        return $http.delete(`/api/classifieds/${id}`).then((classified) => {
          return classified.data
        })
      }
  }

}())
