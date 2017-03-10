import { Meteor } from 'meteor/meteor';

class UsersRepository {

  follow(followee, follower, follow) {
    console.log(`called follow for followee: ${followee}, follower: ${follower}, follow: ${follow}`);
    const followeeUser = Meteor.users.findOne({ handle : followee });
    const followerUser = Meteor.users.findOne({ handle : follower });
    try {
      if(follow) {
        // follow
        Meteor.users.update({_id: followeeUser._id}, {$addToSet: {followers: follower}});
        Meteor.users.update({_id: followerUser._id}, {$addToSet: {followees: followee}});
      } else {
        // unfollow
        Meteor.users.update({_id: followeeUser._id}, {$pull: {followers: follower}});
        Meteor.users.update({_id: followerUser._id}, {$pull: {followees: followee}});
      }
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  getUser(handle) {
    console.log(`Called getUser for handle: ${handle}`);
    return Meteor.users.findOne({handle});
  }

}

export default UsersRepository;
