/**
 * Created by TSShriram on 8/6/14.
 */
describe("Hello world", function () {
    var element;
    var $scope;
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<div>{{2 + 2}}</div>");
        element = $compile(element)($rootScope)
    }))

    it('should equal 4', function () {
        $scope.$digest()
        expect(element.html()).toBe("4");
    })
})

describe('calculator_app', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('calculator_app');
    });

    describe("CalculatorIndexController", function () {
    var httpBackend, authRequestHandler;

        var baseUrl = "http://localhost:3000";
        beforeEach(inject(function ($rootScope, $controller,$httpBackend) {
            scope = $rootScope.$new();
            httpBackend =$httpBackend
            controller = $controller('CalculatorIndexController', {
                '$scope': scope
            });
        }));

        it('should check the length of the command history to be 3', function () {
            scope.append()
            scope.append()
            expect(scope.commandHistory.length).toBe(2)
        })

        it('should expect the http put request to be called', function () {


            httpBackend.expectPUT('/api/calculator_update').respond(200, { state: 5 });
            scope.update("add 5")

            httpBackend.flush();
            expect(scope.commandHistory.length).toBe(1)


        })

        it('should not add the command history', function () {


            httpBackend.expectPUT('/api/calculator_update').respond(401, { state: 5 });
            scope.update("add 5")

            httpBackend.flush();
            expect(scope.commandHistory.length).toBe(0)


        })
    })

})

