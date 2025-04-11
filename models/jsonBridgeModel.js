const mongoose = require('mongoose');

const JsonBridgeSchema = new mongoose.Schema({
  metadata: {
    version: { type: String, default: "1.0" },
    timestamp: { type: Date, default: Date.now },
    sessionId: { type: String, required: true },
    language: { type: String, default: "italiano" },
    completionStatus: {
      formsCompleted: [String],
      overallProgress: { type: Number, default: 0 }
    }
  },
  userInputs: {
    form1: { type: mongoose.Schema.Types.Mixed },
    form2: { type: mongoose.Schema.Types.Mixed },
    form3: { type: mongoose.Schema.Types.Mixed },
    form4: { type: mongoose.Schema.Types.Mixed },
    form5: { type: mongoose.Schema.Types.Mixed },
    form6: { type: mongoose.Schema.Types.Mixed },
    form7: { type: mongoose.Schema.Types.Mixed },
    form8: { type: mongoose.Schema.Types.Mixed },
    form9: { type: mongoose.Schema.Types.Mixed }
  },
  aiGeneratedContent: {
    executiveSummary: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    situationAnalysis: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    marketing: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    operations: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    management: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    growthStrategy: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    finance: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    },
    riskMitigation: {
      status: { type: String, default: "pending" },
      content: String,
      lastUpdated: Date
    }
  },
  processingMetadata: {
    currentSection: String,
    promptConfig: {
      tone: { type: String, default: "professionale" },
      audience: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('JsonBridge', JsonBridgeSchema);