'use strict';

angular.module('sdlctoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('training', {
                parent: 'trainings',
                url: '/trainings',
                data: {
                    roles: ['ROLE_TRAINER'],
                    pageTitle: 'Trainings'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/trainings/training/trainings.html',
                        controller: 'TrainingController'
                    }
                },
                resolve: {
                }
            })
            .state('training.detail', {
                parent: 'entity',
                url: '/training/{id}',
                data: {
                    roles: ['ROLE_TRAINER'],
                    pageTitle: 'Training'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/trainings/training/training-detail.html',
                        controller: 'TrainingDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Training', function($stateParams, Training) {
                        return Training.get({id : $stateParams.id});
                    }]
                }
            })
            .state('training.new', {
                parent: 'training',
                url: '/new',
                data: {
                    roles: ['ROLE_TRAINER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/trainings/training/training-dialog.html',
                        controller: 'TrainingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, description: null, last_modified: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('training', null, { reload: true });
                    }, function() {
                        $state.go('training');
                    })
                }]
            })
            .state('training.edit', {
                parent: 'training',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_TRAINER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/trainings/training/training-dialog.html',
                        controller: 'TrainingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Training', function(Training) {
                                return Training.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('training', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });