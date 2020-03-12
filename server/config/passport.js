import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import GithubStrategy from 'passport-github';
import Methods from '../helpers/dbMethods';
import { response } from 'express';
import oauthMid from '../middleware/oauth'



passport.use(new facebookStrategy({
    clientID: process.env.facebookID,
    clientSecret: process.env.facebookSecret,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['name', 'email']
  },oauthMid))

passport.use(new GithubStrategy({
    clientID : process.env.githubID,
    clientSecret : process.env.githubSecret,
    callbackURL:'/auth/github/redirect',
    scope: [ 'user:email' ]
  },oauthMid))

passport.use(new GoogleStrategy({
    clientID : process.env.googleID,
    clientSecret : process.env.googleSecret,
    callbackURL:'/auth/google/redirect'
  },oauthMid))
  
  passport.serializeUser((user,done)=>{
    done(null,user)
  })
  
  passport.deserializeUser(async(user,done)=>{
    const User = await Methods.select(
      "*",
      "users", 
      `${user.provider}id='${user.id}'`);
    done(null,User)
  })
  
export default passport