///<reference path='references.ts' />

/**
 * Created by Bob on 5/13/2014.
 */
class NavigationController {

    private $location: ng.ILocationService;

    constructor($location){
        this.$location = $location;
    }

    isActive(viewLocation:string):boolean{
        return viewLocation === this.$location.path();
    }
}

angular.module('angularCrud')
    .controller('NavigationController', ['$location',($location) => new NavigationController($location)]);