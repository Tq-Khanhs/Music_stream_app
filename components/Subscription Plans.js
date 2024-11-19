import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ImageBackground 
} from 'react-native';

const App = () => {
  return (
    <ImageBackground 
      source={require('./assets/img13/Image 116.png')} // Đảm bảo file ảnh được đặt trong thư mục assets
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Unlimited</Text>
          <Text style={styles.headerTitle}>music selections</Text>
        </View>

        {/* Premium Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.premiumTitle}>Premium</Text>
              <Text style={styles.freeTrialText}>Free for 1 month</Text>
            </View>
            <Text style={styles.priceText}>$12.99/month</Text>
          </View>

          {/* Features List */}
          {[
            'Ad-free listening',
            'Download to listen offline',
            'Access full catalog Premium',
            'High sound quality',
            'Cancel anytime'
          ].map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}

          {/* Subscribe Button */}
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.buttonText}>Subscribe now</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Back home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  freeTrialText: {
    color: '#6B46C1',
    fontSize: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    color: '#6B46C1',
    fontSize: 18,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#4A5568',
  },
  subscribeButton: {
    backgroundColor: '#1A202C',
    borderRadius: 25,
    padding: 16,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 'auto',
    paddingBottom: 24,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;