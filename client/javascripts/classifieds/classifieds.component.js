(function() {
  'use strict'
  angular
    .module('app')
    .component('classifieds', {
      controller: controller,
      templateUrl: './javascripts/classifieds/classifieds.html'
    })

  controller.$inject = ['classService', '$state']

  function controller(classService, $state) {
    const vm = this
    vm.$onInit = onInit
    vm.getIt = getIt
    vm.createClass = createClass
    vm.deleteClass = deleteClass
    vm.toggleEdit = toggleEdit
    vm.editClass = editClass

    function onInit() {
      getIt()
    }

    function getIt() {
      classService.getClass().then(classifieds => {
        vm.classifieds = classifieds
      })
    }

    function createClass() {
      classService.addClass(vm.post).then(post => {
      })
      delete vm.post
      $state.reload()
    }

    function toggleEdit() {
      vm.showClass = vm.showClass ? !vm.showClass : true

    }

    function editClass(post) {
      console.log('1 in comp', vm.editP, 'id in comp', post.id)
      classService.editClass(post.id, vm.editP).then(item => {
        console.log('2 in comp', item)
        })
        $state.reload()
    }

    function deleteClass(post) {
      classService.deleteClass(post.id).then(classifieds => {
        $state.reload()
      })
    }
  }
}())
