print("hello")
import tweepy
api_key = 'Z5Lt3ECYGraDuECw2ddriWiOU'
api_secret_key = 'BcMhCVk91aY5oUUhcIJjKYgidfQRUAYzSfT2bK0c8nTXOIJezQ'
access_token = '88456653863649280-f1GYt02VmqyGq2HaiqZwV7Yii1BV6O1'
secret_access_token = 'RF04k1pQTlrQbf20bI4zAbHm14j16jryIJfDUr2AflflF'
#from tweepy import OAuthHandler

auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, secret_access_token)

api = tweepy.API(auth)

#public_tweepy.API('Yunus Hatipoglu')

#for tweet in public_tweets:
 #   print(tweet.text)
  #  analysis = TextBlob(tweet.text)
   # print(analysis.sentiment)