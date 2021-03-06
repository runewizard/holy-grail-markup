var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cached          = require('gulp-cached'),
    remember        = require('gulp-remember'),
    path            = require('path'),
    multipipe       = require('multipipe'),
    notify          = require('gulp-notify');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

gulp.task('sass', function(filepath) {
    return multipipe (
        gulp.src('*.scss'),
        cached('*.scss'),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        sass(),
        remember('*.scss'),
        gulp.dest('./')
    ).on('error', notify.onError(function(err){
        return {
            title: 'Error',
            message: err.message
        }
    }));
});

gulp.task('watch', function() {
    gulp.watch('*.scss', ['sass']).on('unlink', function(filepath) {
        remember.forget('sass', path.resolve(filepath));
        delete cached.caches.sass[path.resolve(filepath)];
    });
});

gulp.task('default', ['sass', 'watch']);