import { Meteor } from 'meteor/meteor';

class UsersRepository {

  follow(followee, follower, follow) {
    console.log(`called follow for followee: ${followee}, follower: ${follower}, follow: ${follow}`);
    const followeeUser = Meteor.users.findOne({ handle : followee });
    const followerUser = Meteor.users.findOne({ handle : follower });
    try {
      if(follow) {
        // follow
        Meteor.users.update({_id: followeeUser._id}, {$addToSet: {follower: follower}});
        Meteor.users.update({_id: followerUser._id}, {$addToSet: {followee: followee}});
      } else {
        // unfollow
        Meteor.users.update({_id: followeeUser._id}, {$pull: {follower: follower}});
        Meteor.users.update({_id: followerUser._id}, {$pull: {followee: followee}});
      }
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }
}

export default UsersRepository;
